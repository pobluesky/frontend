import React, { useState, useEffect } from 'react';
import RequestBar from './../../components/molecules/RequestBar';
import '../../assets/css/Form.css';
import {
    AdditionalRequestForm,
    InquiryHistoryFormItem,
    FileFormItem,
    Offersheet,
} from '../../components/organisms/inquiry-form';
import {
    getInquiryDetailByManagers, putProgress,
} from '../../apis/api/inquiry';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfoByCustomers } from '../../apis/api/auth';
import {
    getQualities,
    getReviews,
    getOfferSheets,
    postReview,
    postOfferSheet,
    putReview,
} from '../../apis/api/review';
import ManagerInqPath from '../../components/atoms/ManagerInqPath';
import ManagerBasicInfoForm
    from '../../components/organisms/inquiry-form/ManagerBasicInfoForm';
import QualityReviewTextFormItem
    from '../../components/organisms/inquiry-form/quality-item/QualityReviewTextFormItem';
import QualityFileFormItem
    from '../../components/organisms/inquiry-form/quality-item/QualityFileFormItem';
import SalesInfoForm
    from '../../components/organisms/inquiry-form/review-form/SalesInfoForm';
import ReviewTextForm
    from '../../components/organisms/inquiry-form/review-form/ReviewTextForm';
import SalesInfoFormItem
    from '../../components/organisms/inquiry-form/review-item/SalesInfoFormItem';
import FinalReviewTextFormItem
    from '../../components/organisms/inquiry-form/review-item/FinalReviewTextFormItem';
import FinalReviewTextForm
    from '../../components/organisms/inquiry-form/review-form/FinalReviewTextForm';
import ReviewTextFormItem
    from '../../components/organisms/inquiry-form/review-item/ReviewTextFormItem';
import { InqTableContainer } from '../../assets/css/Inquiry.css';
import {
    postNotificationByCustomers,
    postNotificationByManagers,
} from '../../apis/api/notification';
import { useAuth } from '../../hooks/useAuth';
import { assignQualityManagerByUserId } from '../../apis/api/manager';
import { CircularProgress, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { OfferSheetReceipts } from '../../utils/inquiry';
import {
    FinalReviewCompleteAlert,
    FirstReviewCompleteAlert,
} from '../../utils/actions';

function SalesManagerInqItem() { // 판매담당자 Inquiry 조회 페이지
    const { id } = useParams();
    const { userId, userName, role } = useAuth();
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
    const [qualityData, setQualityData] = useState(null);
    const [offerSheetData, setOfferSheetData] = useState(null);
    const [isReviewItem, setIsReviewItem] = useState(false);
    const [isQualityItem, setIsQualityItem] = useState(false);
    const [isOfferSheetItem, setIsOfferSheetItem] = useState(false);
    const [isFinalReview, setIsFinalReview] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(null);
    const [currentInqType, setCurrentInqType] = useState(null);
    const [requestTitle, setRequestTitle] = useState(null);
    const [selectedQualityManagerId, setSelectedQualityManagerId] = useState(null);
    const [receipts, setReceipts] = useState([]);

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
        salesManagerId: null,
        salesManagerName: '',
        qualityManagerName: '',
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
        contract: '',
        thicknessNotify: '',
        reviewText: '',
        finalReviewText: '',

        // quality
        finalResult: '',
        finalResultDetails: '',
        standard: '',
        orderCategory: '',
        coatingMetalQuantity: '',
        coatingOilQuantity: '',
        thicknessTolerance: '',
        orderEdge: '',
        customerQReq: '',
        availableLab: '',
        qualityComments: '',
        qualityFiles: [],
        qualityFileName: '',
        qualityFilePath: '',

        // offerSheet
        message: '',
        priceTerms: '',
        paymentTerms: '',
        shipment: '',
        validity: '',
        destination: '',
        remark: '',
        receipts: []
    });

    const getInquiryDataDetail = async () => {
        try {
            const realId = id.slice(-2);
            const response = await getInquiryDetailByManagers(realId);
            setInquiriesDataDetail(response.data);
            setCurrentProgress(response.data.progress);
            setCurrentInqType(response.data.inquiryType);
            setFormData(prevData => ({
                ...prevData,
                customerId: response.data.customerId,
                lineItemResponseDTOs: response.data.lineItemResponseDTOs || []
            }));
        } catch (error) {
            console.log('Error fetching InquiryDetail:', error);
        }
    };

    const getUserInfo = async () => {
        if (formData.customerId) {
            try {
                const response = await getUserInfoByCustomers(formData.customerId);
                setUserInfo(response.data.data);
                return response.data.data;
            } catch (error) {
                console.log('Error fetching User Info:', error);
            }
        }
    }

    const getReview = async () => {
        try {
            const response = await getReviews(realId);
            setReviewData(response.data);
            setIsReviewItem(true);
            if (response.data.finalReviewText === null) {
                setIsFinalReview(false)
            } else if (true) {
                setIsFinalReview(true);
            }
            return response.data;
        } catch (error) {
            console.log('Error fetching Reviews:', error);
        }
    }

    const getQuality = async () => {
        try {
            const response = await getQualities(realId);
            setQualityData(response.data);
            setIsQualityItem(true);
            return response.data;
        } catch (error) {
            console.log('Error fetching Qualities:', error);
        }
    }

    const getOfferSheet = async () => {
        try {
            const response = await getOfferSheets(realId);
            setOfferSheetData(response.data);
            setIsOfferSheetItem(true);
            setFormData(prevData => ({
                ...prevData,
                receipts: response.data.receipts || []
            }));
            return response.data;
        } catch (error) {
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                getInquiryDataDetail(),
                getUserInfo(),
                getReview(),
                getQuality(),
                getOfferSheet(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (inquiriesDataDetail && userInfo) {
            setFormData(prevFormData => ({
                ...prevFormData,
                additionalRequests: inquiriesDataDetail.additionalRequests || '',
                corporate: inquiriesDataDetail.corporate || '',
                corporationCode: inquiriesDataDetail.corporationCode || '',
                country: inquiriesDataDetail.country || '',
                customerCode: userInfo?.data?.customerCode || '',
                customerId: inquiriesDataDetail.customerId || null,
                customerName: inquiriesDataDetail.customerName || '',
                customerRequestDate: inquiriesDataDetail.customerRequestDate || '',
                salesManagerId: inquiriesDataDetail?.salesManagerSummaryDto?.userId || null,
                salesManagerName: inquiriesDataDetail?.salesManagerSummaryDto?.name || '',
                qualityManagerName: inquiriesDataDetail?.qualityManagerSummaryDto?.name || '',
                files: inquiriesDataDetail.files || [],
                industry: inquiriesDataDetail.industry || '',
                inquiryId: inquiriesDataDetail.inquiryId || null,
                inquiryType: inquiriesDataDetail.inquiryType || '',
                name: inquiriesDataDetail.name || '',
                email: userInfo?.data?.email || '',
                phone: userInfo?.data?.phone || '',
                productType: inquiriesDataDetail.productType || '',
                progress: inquiriesDataDetail.progress || '',
                salesPerson: inquiriesDataDetail.salesPerson || '',
                contract: reviewData?.salesInfo.contract || '',
                thicknessNotify: qualityData?.qualityReviewInfo.thicknessNotify || '',
                reviewText: reviewData?.reviewText || '',
                finalReviewText: reviewData?.finalReviewText || '',
                lineItemResponseDTOs: inquiriesDataDetail.lineItemResponseDTOs || [],
                finalResult: qualityData?.qualityReviewInfo.finalResult || '',
                finalResultDetails: qualityData?.qualityReviewInfo.finalResultDetails || '',
                standard: qualityData?.qualityReviewInfo.standard || '',
                orderCategory: qualityData?.qualityReviewInfo.orderCategory || '',
                coatingMetalQuantity: qualityData?.qualityReviewInfo.coatingMetalQuantity || '',
                coatingOilQuantity: qualityData?.qualityReviewInfo.coatingOilQuantity || '',
                thicknessTolerance: qualityData?.qualityReviewInfo.thicknessTolerance || '',
                orderEdge: qualityData?.qualityReviewInfo.orderEdge || '',
                customerQReq: qualityData?.qualityReviewInfo.customerQReq || '',
                availableLab: qualityData?.qualityReviewInfo.availableLab || '',
                qualityComments: qualityData?.qualityComments || '',
                qualityFiles: qualityData?.qualityFiles || [],
                qualityFileName: qualityData?.qualityReviewInfo.fileName || '',
                qualityFilePath: qualityData?.qualityReviewInfo.filePath || '',
                message: offerSheetData?.message || '',
                priceTerms: offerSheetData?.priceTerms || '',
                paymentTerms: offerSheetData?.paymentTerms || '',
                shipment: offerSheetData?.shipment || '',
                validity: offerSheetData?.validity || '',
                destination: offerSheetData?.destination || '',
                receipts: offerSheetData?.receipts || []
            }));
        }
    }, [inquiriesDataDetail, userInfo]);

    const handleReviewSubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (id) {
            try {
                const reviewResponse = await postReview(realId, {
                    salesInfo: {
                        contract: formData.contract,
                        thicknessNotify: formData.thicknessNotify,
                    },
                    reviewText: formData.reviewText,
                });
                await postNotificationByCustomers(formData.customerId, {
                    notificationContents:
                        `${inquiriesDataDetail.name}님의 문의 1차 검토가 완료되었습니다.`,
                })
                updateProgress("FIRST_REVIEW_COMPLETED");
                FirstReviewCompleteAlert();
                console.log('Review posted successfully:', reviewResponse);
                setTimeout(() => {
                    navigate(`/inq-list/${role}`);
                }, '2000');
            } catch (error) {
                console.log('Error posting review:', error);
            }
        }
    }

    const handleQualitySubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (id) {
            try {
                await postNotificationByCustomers(formData.customerId, {
                    notificationContents:
                        `${inquiriesDataDetail.name}님의 문의는 현재 품질 검토 진행 중입니다.`,
                })
                setTimeout(() => {
                    navigate(`/inq-list/${role}`);
                }, '2000');
            } catch (error) {
                console.log('Error posting notification:', error);
            }
        }
    }

    const handleFinalSubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (id) {
            try {
                const reviewResponse = await putReview(realId, {
                    finalReviewText: formData.finalReviewText,
                })
                const offerSheetResponse = await postOfferSheet(realId, {
                    ...formData,
                    receipts: formData.receipts,
                });
                await postNotificationByCustomers(formData.customerId, {
                    notificationContents:
                        `${inquiriesDataDetail.name}님의 문의 최종 검토가 완료되었습니다. 최종 검토 내용과 OfferSheet를 확인해 주세요.`,
                })
                if (inquiriesDataDetail.qualityManagerSummaryDto !== null) {
                    await postNotificationByManagers(inquiriesDataDetail.qualityManagerSummaryDto.userId, {
                        notificationContents:
                            `Inquiry ${realId}번 최종 검토가 완료되었습니다.`,
                    })
                }
                console.log('Final Review updated successfully:', reviewResponse);
                console.log('offerSheet posted successfully:', offerSheetResponse);
                updateProgress("FINAL_REVIEW_COMPLETED");
                FinalReviewCompleteAlert();
                setTimeout(() => {
                    navigate(`/inq-list/${role}`);
                }, '1500');
            } catch (error) {
                console.log('Error updating review OR posting offerSheet:', error);
            }
        }
    }

    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        setValue(field, value);
    };

    const updateProgress = async (nextProgress) => {
        try {
            const response = await putProgress(realId, nextProgress);
            console.log('Progress updated successfully:', response);
        } catch (error) {
            console.log('Error updating progress:', error);
        }
    }

    useEffect(() => {
        if (currentProgress === 'SUBMIT' && userId === inquiriesDataDetail.salesManagerSummaryDto.userId) {
            setRequestTitle('Inquiry 상세조회 및 영업검토1');
        } else if (currentProgress === 'RECEIPT') {
            setRequestTitle('Inquiry 상세조회 및 영업검토2');
        } else if (currentProgress === 'FIRST_REVIEW_COMPLETED' && currentInqType === 'QUOTE_INQUIRY') {
            setRequestTitle('Inquiry 상세조회 및 영업검토5');
        } else if (currentProgress === 'FIRST_REVIEW_COMPLETED' && currentInqType === 'COMMON_INQUIRY') {
                setRequestTitle('Inquiry 상세조회 및 영업검토3');
        } else if (currentProgress === 'QUALITY_REVIEW_COMPLETED' && currentInqType === 'COMMON_INQUIRY') {
            setRequestTitle('Inquiry 상세조회 및 영업검토5');
        } else {
            setRequestTitle('Inquiry 조회8');
        }
    }, [currentProgress, currentInqType]);

    const handleManagerSelect = (selectedData) => {
        setSelectedQualityManagerId(selectedData);
    };

    const allocateByQualityManagerId = async () => {
        try {
            await assignQualityManagerByUserId(realId, selectedQualityManagerId);
            console.log("realId: ", realId)
            console.log("selectedQualityManagerId: ", selectedQualityManagerId)
            console.log("품질담당자 할당 성공")
        } catch (error) {
            console.log('Inquiry 품질 담당자 배정 실패: ', error);
        }
    };

    const handlePreviewReviewData = () => {
        handleFormDataChange('contract', 'CUSTOMER_RELATIONSHIP');
        handleFormDataChange('thicknessNotify', '본 제품의 두께는 일반적인 규격보다 약간 더 두꺼운 편입니다.');
        handleFormDataChange('reviewText', '특정 용도에 맞게 맞춤 제작된 것이며, 프로젝트 요구 사항에 부합하지 않을 경우 추가 논의가 필요합니다.');
    }

    const handlePreviewOfferSheetData = () => {
        handleFormDataChange('finalReviewText',
            '최종 검토 결과, 제품과 설비의 규격이 요구사항에 부합하며, 모든 사양이 충족됨을 확인하였습니다.\n향후 개선 사항으로는 제품의 품질 향상과 설비 효율성 강화를 위한 지속적인 모니터링이 필요합니다.');
        handleFormDataChange('message', '    <h2>견적서 추가 검토사항\n</h2>'
            + '    <ul>\n'
            + '        <li>\n'
            + '            <strong>납품 기한 조정 가능성</strong>: 요청하신 일정에 맞춰 최대한 신속하게 납품할 수 있도록 준비하고 있습니다.'
            + '        </li>\n'
            + '        <li>\n'
            + '            <strong>운송 관련 사항</strong>: 본 견적서에 운송비가 포함되어 있으며, 특정 요구 사항이 있을 경우 별도로 협의 가능합니다.\n'
            + '        </li>\n'
            + '    </ul>\n\n'
            + '');
        handleFormDataChange('priceTerms', 'FOB (Free on Board)');
        handleFormDataChange('paymentTerms', 'Net 30 Days');
        handleFormDataChange('shipment', '2024-10-18');
        handleFormDataChange('validity', '2024-10-20');
        handleFormDataChange('destination', 'Busan Port, South Korea');
        handleFormDataChange('remark', 'Please ensure timely shipment and proper packaging.');
        setReceipts(OfferSheetReceipts);
    }

    return (
        <div className={InqTableContainer}>
            <ManagerInqPath
                largeCategory={'Inquiry'}
                mediumCategory={'Inquiry 조회'}
                smallCategory={id}
                role={'sales'}
            />

            {loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    <RequestBar
                        requestBarTitle={requestTitle}
                        onReviewSubmit={handleSubmit(handleReviewSubmit)}
                        onQualitySubmit={handleQualitySubmit}
                        onFinalSubmit={handleSubmit(handleFinalSubmit)}
                        onAllocate={allocateByQualityManagerId}
                    />
                    <ManagerBasicInfoForm
                        formData={inquiriesDataDetail}
                        salesManagerName={inquiriesDataDetail?.salesManagerSummaryDto?.name || '-'}
                        qualityManagerName={inquiriesDataDetail?.qualityManagerSummaryDto?.name || '-'}
                        progress={currentProgress}
                        onManagerSelect={handleManagerSelect}
                    />

                    <InquiryHistoryFormItem
                        productType={inquiriesDataDetail?.productType}
                        lineItemData={formData.lineItemResponseDTOs}
                    />

                    <AdditionalRequestForm formData={inquiriesDataDetail} />

                    {isReviewItem ? (
                        <>
                            <SalesInfoFormItem formData={reviewData} />
                            <ReviewTextFormItem formData={reviewData} />
                        </>
                    ) : (
                        <>
                            <SalesInfoForm formData={formData}
                                           handleFormDataChange={handleFormDataChange}
                                           isPreviewData={true}
                                           handleIsPreview={handlePreviewReviewData}
                                           register={register}
                                           errors={errors}
                            />
                            <ReviewTextForm formData={formData}
                                            handleFormDataChange={handleFormDataChange}
                                            register={register}
                                            errors={errors}
                            />
                        </>
                    )}

                    {isFinalReview ? (
                        <FinalReviewTextFormItem formData={reviewData} />
                    ) : (
                        <FinalReviewTextForm formData={formData}
                                             handleFormDataChange={handleFormDataChange}
                                             isPreviewData={true}
                                             handleIsPreview={handlePreviewOfferSheetData}
                                             // register={register}
                                             // errors={errors}
                        />
                    )}

                    {isQualityItem ? (
                        <>
                            <QualityReviewTextFormItem formData={qualityData} />
                            <QualityFileFormItem fileForm={'품질검토 첨부파일'}
                                                 formData={qualityData} />
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
                        <Offersheet formData={formData}
                                    inquiryData={inquiriesDataDetail}
                                    lineItemData={formData.receipts}
                                    handleFormDataChange={handleFormDataChange}
                                    onLineItemsChange={(newLineItems) => setFormData(
                                        prev => ({
                                            ...prev,
                                            receipts: newLineItems,
                                        }))}
                                    isPreviewData={true}
                                    receipts={receipts}
                        />
                    )}

                    <FileFormItem fileForm={'첨부파일'} formData={inquiriesDataDetail} />
                </>
            )}
        </div>
    )
}

export default SalesManagerInqItem;
