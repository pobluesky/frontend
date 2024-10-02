import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InqPath from '../../components/atoms/InqPath';
import RequestBar from './../../components/molecules/RequestBar';
import {
    AdditionalRequestForm,
    BasicInfoForm,
    FileFormItem,
    Offersheet,
    InquiryHistoryFormItem,
    InquiryNewForm,
    InquiryHistoryForm,
} from '../../components/organisms/inquiry-form';
import FileUpdateForm from '../../components/organisms/inquiry-form/FileUpdateForm';
import ReviewTextFormItem from '../../components/organisms/inquiry-form/review-item/ReviewTextFormItem';
import FinalReviewTextFormItem from '../../components/organisms/inquiry-form/review-item/FinalReviewTextFormItem';
import { useAuth } from '../../hooks/useAuth';
import { getInquiryDetail, putInquiry } from '../../apis/api/inquiry';
import { getUserInfoByCustomers } from '../../apis/api/auth';
import { getOfferSheets, getReviews } from '../../apis/api/review';
import { postNotificationByCustomers } from '../../apis/api/notification';
import { InquiryUpdateAlert } from '../../utils/actions';
import { InqTableContainer } from '../../assets/css/Inquiry.css';
import '../../assets/css/Form.css';
import { CircularProgress, Grid } from '@mui/material';

function CustomerInqItem() {
    // 고객사 Inquiry 조회 페이지
    const { userId, role } = useAuth();
    const { id } = useParams();
    const realId = id.slice(-2);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(true);
    const [inquiriesDataDetail, setInquiriesDataDetail] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [offerSheetData, setOfferSheetData] = useState(null);

    const [isReviewItem, setIsReviewItem] = useState(false);
    const [isOfferSheetItem, setIsOfferSheetItem] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [formData, setFormData] = useState({
        // inquiry
        additionalRequests: '',
        corporate: '',
        corporationCode: '',
        country: '',
        customerCode: '',
        customerId: null,
        customerName: '',
        customerRequestDate: '',
        salesManagerName: '',
        files: [],
        industry: '',
        inquiryId: null,
        inquiryType: '',
        name: '',
        email: '',
        phone: '',
        productType: '',
        progress: '',
        salesPerson: '',
        lineItemResponseDTOs: [],

        // review
        reviewText: '',
        finalReviewText: '',

        // offerSheet
        message: '',
        priceTerms: '',
        paymentTerms: '',
        shipment: '',
        validity: '',
        destination: '',
        remark: '',
        receipts: [],
    });

    const getInquiryDataDetail = async () => {
        const activeUserId = userId || sessionStorage.getItem('userId');

        if (!activeUserId) return;

        try {
            const response = await getInquiryDetail(activeUserId, realId);
            setInquiriesDataDetail(response.data);
            setFormData((prevData) => ({
                ...prevData,
                ...response.data,
                lineItemRequestDTOs: response.data.lineItemResponseDTOs || [],
                files: response.data.files || [],
            }));
        } catch (error) {
            console.log('Error fetching InquiryDetail:', error);
        }
    };

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
    };

    const getReview = async () => {
        if (!userId) {
            return;
        }
        try {
            const response = await getReviews(realId);
            setReviewData(response.data);
            setIsReviewItem(true);
            return response.data;
        } catch (error) {
            console.log('Error fetching Reviews:', error);
        }
    };

    const getOfferSheet = async () => {
        try {
            const response = await getOfferSheets(realId);
            setOfferSheetData(response.data);
            setIsOfferSheetItem(true);
            setFormData((prevData) => ({
                ...prevData,
                receipts: response.data.receipts || [],
            }));
            return response.data;
        } catch (error) {
            console.log('Error fetching OfferSheet:', error);
        }
    };

    const getProgress = async () => {
        try {
            const response = await getInquiryDetail(userId, realId);
            if (response.data.progress === 'SUBMIT' && role === 'customer') {
                setIsUpdate(true);
                localStorage.setItem('isUpdate', true);
            } else {
                setIsUpdate(false);
                localStorage.removeItem('isUpdate');
            }
        } catch (error) {
            console.log('Error fetching Progress:', error);
        }
    };

    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setValue(field, value);
    };

    const handleUpdate = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const updatedFormData = {
            ...formData,
            files: formData.files || [],
            lineItemResponseDTOs: formData.lineItemResponseDTOs || [],
        };
        try {
            const inquiryUpdateResponse = await putInquiry(realId, updatedFormData);
            const notificationResponse = await postNotificationByCustomers(
                userId,
                {
                    notificationContents: `${formData.name}님의 Inquiry가 수정되었으며, 담당자 배정 시 수정이 불가합니다.`,
                },
            );
            console.log('Inquiry posted successfully:', inquiryUpdateResponse);
            console.log(
                'Notification posted successfully:',
                notificationResponse,
            );

            InquiryUpdateAlert();
            setTimeout(() => {
                navigate(`/inq-list/${role}`);
            }, '2000');
        } catch (error) {
            console.log('Error updating Inquiry:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                getInquiryDataDetail(),
                getUserInfo(),
                getReview(),
                getOfferSheet(),
                getProgress(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (inquiriesDataDetail && userInfo) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                additionalRequests:
                    inquiriesDataDetail.additionalRequests || '',
                corporate: inquiriesDataDetail.corporate || '',
                corporationCode: inquiriesDataDetail.corporationCode || '',
                country: inquiriesDataDetail.country || '',
                customerCode: userInfo.data.customerCode || '',
                customerId: inquiriesDataDetail.customerId || null,
                customerName: inquiriesDataDetail.customerName || '',
                customerRequestDate:
                    inquiriesDataDetail.customerRequestDate || '',
                salesManagerName:
                    inquiriesDataDetail?.salesManagerSummaryDto.name || '',
                files: inquiriesDataDetail.files || [],
                industry: inquiriesDataDetail.industry || '',
                inquiryId: inquiriesDataDetail.inquiryId || null,
                inquiryType: inquiriesDataDetail.inquiryType || '',
                name: inquiriesDataDetail.name || '',
                email: userInfo.data.email || '',
                phone: userInfo.data.phone || '',
                productType: inquiriesDataDetail.productType || '',
                progress: inquiriesDataDetail.progress || '',
                salesPerson: inquiriesDataDetail.salesPerson || '',
                reviewText: reviewData?.reviewText || '',
                finalReviewText: reviewData?.finalReviewText || '',
                lineItemResponseDTOs:
                    inquiriesDataDetail.lineItemResponseDTOs || [],
                message: offerSheetData?.message || '',
                priceTerms: offerSheetData?.priceTerms || '',
                paymentTerms: offerSheetData?.paymentTerms || '',
                shipment: offerSheetData?.shipment || '',
                validity: offerSheetData?.validity || '',
                destination: offerSheetData?.destination || '',
                receipts: offerSheetData?.receipts || [],
            }));
        }
    }, [inquiriesDataDetail, userInfo]);

    // 데이터 저장 시
    useEffect(() => {
        if (inquiriesDataDetail) {
            localStorage.setItem(
                'inquiryData',
                JSON.stringify(inquiriesDataDetail),
            );
        }
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
        if (reviewData) {
            localStorage.setItem('reviewData', JSON.stringify(reviewData));
        }
        if (offerSheetData) {
            localStorage.setItem(
                'offerSheetData',
                JSON.stringify(offerSheetData),
            );
        }
    }, [inquiriesDataDetail, userInfo, reviewData, offerSheetData]);

    // 새로고침 시 데이터 불러오기
    useEffect(() => {
        const storedInquiryData = localStorage.getItem('inquiryData');
        const storedUserInfo = localStorage.getItem('userInfo');
        const storedReviewData = localStorage.getItem('reviewData');
        const storedOfferSheetData = localStorage.getItem('offerSheetData');
        const storedIsReviewItem = localStorage.getItem('isReviewItem');
        const storedIsOfferSheetItem = localStorage.getItem('isOfferSheetItem');
        const storedIsUpdate = localStorage.getItem('isUpdate');

        if (storedInquiryData) {
            setInquiriesDataDetail(JSON.parse(storedInquiryData));
        }
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
        if (storedReviewData) {
            setReviewData(JSON.parse(storedReviewData));
        }
        if (storedOfferSheetData) {
            setOfferSheetData(JSON.parse(storedOfferSheetData));
        }
        if (storedIsReviewItem) {
            setIsReviewItem(JSON.parse(storedIsReviewItem));
        }
        if (storedIsOfferSheetItem) {
            setIsOfferSheetItem(JSON.parse(storedIsOfferSheetItem));
        }
        if (storedIsUpdate) {
            setIsUpdate(JSON.parse(storedIsUpdate));
        }
    }, []);

    return (
        <div className={InqTableContainer}>
            <InqPath
                largeCategory={'Inquiry'}
                mediumCategory={'Inquiry 조회'}
                smallCategory={id}
            />

            {loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    <RequestBar
                        requestBarTitle={'Inquiry 조회0'}
                        role={'customer'}
                        isUpdate={isUpdate}
                        onUpdate={handleSubmit(handleUpdate)}
                    />
                    {isUpdate ? (
                        <>
                            {/* 신규작성 및 수정 때 */}
                            <InquiryNewForm
                                title={'기본정보'}
                                register={register}
                                errors={errors}
                                formData={formData}
                                isUpdate={true}
                                isForm={false}
                                handleFormDataChange={handleFormDataChange}
                            />
                            <InquiryHistoryForm
                                productType={formData.productType}
                                lineItemData={formData.lineItemResponseDTOs}
                                onLineItemsChange={(lineItems) =>
                                    handleFormDataChange(
                                        'lineItemRequestDTOs',
                                        lineItems,
                                    )
                                }
                                isUpdate={isUpdate}
                            />
                            <AdditionalRequestForm
                                formData={formData}
                                handleFormDataChange={handleFormDataChange}
                            />
                            <FileUpdateForm
                                fileForm={'파일수정'}
                                formData={formData}
                                fileData={inquiriesDataDetail}
                                handleFormDataChange={handleFormDataChange}
                            />
                        </>
                    ) : (
                        <>
                            {/* 단순 조회할 때 */}
                            <BasicInfoForm formData={formData} />
                            <InquiryHistoryFormItem
                                productType={inquiriesDataDetail?.productType}
                                lineItemData={formData.lineItemResponseDTOs}
                            />
                            <AdditionalRequestForm
                                formData={formData}
                                readOnly={true}
                            />
                            <FileFormItem
                                fileForm={'첨부파일'}
                                formData={inquiriesDataDetail}
                            />
                        </>
                    )}

                    {isReviewItem ? (
                        <>
                            <ReviewTextFormItem formData={reviewData} />
                            <FinalReviewTextFormItem formData={reviewData} />
                        </>
                    ) : (
                        ''
                    )}

                    {isOfferSheetItem ? (
                        <Offersheet
                            formData={offerSheetData}
                            inquiryData={inquiriesDataDetail}
                            lineItemData={offerSheetData.receipts}
                            isOfferSheetItem={isOfferSheetItem}
                        />
                    ) : (
                        ''
                    )}
                </>
            )}
        </div>
    );
}

export default CustomerInqItem;
