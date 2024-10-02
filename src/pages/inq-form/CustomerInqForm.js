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
import {
    InquiryCompleteAlert,
    InquiryPostErrorAlert,
} from '../../utils/actions';
import { useNavigate } from 'react-router-dom';
import { InqTableContainer } from '../../assets/css/Inquiry.css';
import { postNotificationByCustomers } from '../../apis/api/notification';

function CustomerInqForm() { // 고객사 Inquiry 작성 페이지
    const { userId, role } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const lineItemsRef = useRef(null);
    const fileRef = useRef(null);
    const [isUpdate, setIsUpdate] = useState(true);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [managerId, setManagerId] = useState(null);
    const [selectedSalesManagerId, setSelectedSalesManagerId] = useState(null);

    useEffect(() => {
        if (error !== '') {
            setIsError(true);
            setAlert(true);

            const timer = setTimeout(() => {
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setIsError(false);
            setAlert(false);
        }
    }, [error]);

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
        salesManagerId: null,
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
        setValue(field, value);
    };

    const handleInquirySubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        try {
            const inquiryResponse = await postInquiry(userId, {
                ...formData,
                salesManagerId: managerId,
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
            customerCode: userInfo.data.customerCode,
            customerName: userInfo.data.customerName,
            name: userInfo.data.name,
            email: userInfo.data.email,
            phone: userInfo.data.phone,
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

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handlePreviewData = () => {
        handleFormDataChange('additionalRequests', '추가사항으로 견적서 요청 드립니다.');
        handleFormDataChange('corporate', 'GG');
        handleFormDataChange('country', 'KOREA');
        handleFormDataChange('customerRequestDate', '2024-10-21');
        handleFormDataChange('industry', 'ELECTRIC');
        handleFormDataChange('inquiryType', 'COMMON_INQUIRY');
        handleFormDataChange('productType', 'WIRE_ROD');
        handleFormDataChange('salesPerson', 'GEUMGANG');
    }

    const handleManagerSelect = (selectedData) => {
        setSelectedSalesManagerId(selectedData);
    };

    return (
        <div className={InqTableContainer}>
            <InqPath largeCategory={'Inquiry'} mediumCategory={'Inquiry 등록'} />
            <RequestBar requestBarTitle={"Inquiry 등록0"} role={"customer"}
                        onReset={onReset}
                        onSubmit={handleSubmit(handleInquirySubmit)}
                        isPreviewData={true}
                        handleIsPreview={handlePreviewData}
            />
            <InquiryNewForm
                title={'기본정보'}
                register={register}
                errors={errors}
                formData={formData}
                isUpdate={false}
                isForm={true}
                handleFormDataChange={handleFormDataChange}
                setManagerId={setManagerId}
                onManagerSelect={handleManagerSelect}
            />
            <InquiryHistoryForm
                onRefLineItems={(func) => (lineItemsRef.current = func)}
                productType={formData.productType}
                lineItemData={formData.lineItemResponseDTOs}
                onLineItemsChange={(lineItems) => handleFormDataChange(
                    'lineItemRequestDTOs', lineItems)}
                isUpdate={isUpdate}
                setError={setError}
            />
            <AdditionalRequestForm
                formData={formData}
                handleFormDataChange={handleFormDataChange}
            />
            <FileForm fileForm={"파일첨부"}
                      formData={formData}
                      onRefFile={(func) => (fileRef.current = func)}
                      handleFormDataChange={handleFormDataChange}
            />
            <InquiryPostErrorAlert
                showAlert={isError}
                onClose={() => {
                setAlert(false);
            }} error={error} />
        </div>
    );
}

export default CustomerInqForm;