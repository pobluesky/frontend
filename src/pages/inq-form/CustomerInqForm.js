import React, { useEffect, useState, useRef } from 'react';
import InqPath from '../../components/atoms/InqPath';
import RequestBar from "../../components/molecules/RequestBar";
import {
    InquiryNewForm,
    InquiryHistoryForm,
    AdditionalRequestForm,
    FileForm,
} from '../../components/organisms/inquiry-form';
import { postInquiry } from '../../apis/api/inquiry';
import { useAuth } from '../../hooks/useAuth';
import { getUserInfoByCustomers } from '../../apis/api/auth';
import { useForm } from 'react-hook-form';
import { InquiryCompleteAlert } from '../../utils/actions';
import { useNavigate } from 'react-router-dom';
import { InqTableContainer } from '../../assets/css/Inquiry.css';
import { postNotificationByCustomers } from '../../apis/api/notification';

function CustomerInqForm() { // 고객사 Inquiry 작성 페이지
    const { userId, role, userName } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const lineItemsRef = useRef(null);
    const fileRef = useRef(null);
    const [isUpdate, setIsUpdate] = useState(true);

    const [userInfo, setUserInfo] = useState(null);

    const [formData, setFormData] = useState({
        // inquiry
        additionalRequests: '',
        corporate: '',
        corporationCode: '(주)포스코',
        country: '',
        customerCode: '',
        customerId: userId,
        customerName: '',
        customerRequestDate: '',
        files: [],
        industry: '',
        inquiryId: null,
        inquiryType: '',
        name: '',
        email: '',
        phone: '',
        productType: '',
        progress: 'RECEIPT',
        salesPerson: '',
        reviewText: '',
        finalReviewText: '',
        lineItemResponseDTOs: [],
    });

    const getUserInfo = async () => {
        if (!userId) {
            return;
        }
        try {
            const response = await getUserInfoByCustomers(userId);
            setUserInfo(response.data);
            return response.data;
        } catch (error) {
            console.log('Error fetching User Info:', error);
        }
    }

    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleInquirySubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        try {
            const inquiryResponse = await postInquiry(userId, {
                ...formData,
                lineItemRequestDTOs: formData.lineItemRequestDTOs,
            });
            await postNotificationByCustomers(userId, {
                notificationContents: `${formData.name}님의 Inquiry가 접수되었습니다.`,
            })
            console.log('Inquiry posted successfully:', inquiryResponse);

            InquiryCompleteAlert();
            setTimeout(() => {
                navigate(`/inq-list/${role}`);
            }, '2000');
        } catch (error) {
            console.log('Error submitting inquiry:', error);
        }
    };

    const onReset = () => {
        setFormData({
            additionalRequests: '',
            corporate: '',
            corporationCode: '(주)포스코',
            country: '',
            customerRequestDate: '',
            files: [],
            industry: '',
            inquiryType: '',
            productType: '',
            salesPerson: '',
            lineItemResponseDTOs: [],
        })

        if (lineItemsRef.current) {
            lineItemsRef.current();
        }

        if (fileRef.current) {
            fileRef.current();
        }
    }

    useEffect(() => {
        if (userInfo) {
            setFormData(prevFormData => ({
                ...prevFormData,
                customerCode: userInfo.data.customerCode || '',
                customerName: userInfo.data.customerName || '',
                name: userInfo.data.name || '',
                email: userInfo.data.email || '',
                phone: userInfo.data.phone || '',
            }));
        }
    }, [userInfo]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        getUserInfo();
    }, [userId]);

    return (
        <div className={InqTableContainer}>
            <InqPath largeCategory={'Inquiry'} mediumCategory={'Inquiry 등록'} />
            <RequestBar requestBarTitle={"Inquiry 등록0"} role={"customer"}
                        onReset={onReset}
                        onSubmit={handleSubmit(handleInquirySubmit)} />
            <InquiryNewForm
                title={'기본정보'}
                register={register}
                errors={errors}
                formData={formData}
                handleFormDataChange={handleFormDataChange}
            />
            <InquiryHistoryForm
                onRefLineItems={(func) => (lineItemsRef.current = func)}
                productType={formData.productType}
                lineItemData={formData.lineItemResponseDTOs}
                onLineItemsChange={(lineItems) => handleFormDataChange(
                    'lineItemRequestDTOs', lineItems)}
                isUpdate={isUpdate}
            />
            <AdditionalRequestForm formData={formData}
                                   handleFormDataChange={handleFormDataChange} />
            <FileForm fileForm={"파일첨부"}
                      formData={formData}
                      onRefFile={(func) => (fileRef.current = func)}
                      handleFormDataChange={handleFormDataChange} />
        </div>
    );
}

export default CustomerInqForm;