import React, { useState, useEffect } from 'react';
import RequestBar from './../../components/molecules/RequestBar';
import '../../assets/css/Form.css';
import {
    AdditionalRequestForm,
    FileFormItem,
    InquiryHistoryFormItem,
} from '../../components/organisms/inquiry-form';
import {
    getInquiryDetailByManagers, putProgress,
} from '../../apis/api/inquiry';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfoByCustomers } from '../../apis/api/auth';
import {
    getQualities,
    postQuality,
} from '../../apis/api/review';
import ManagerInqPath from '../../components/atoms/ManagerInqPath';
import ManagerBasicInfoForm
    from '../../components/organisms/inquiry-form/ManagerBasicInfoForm';
import QualityReviewTextFormItem
    from '../../components/organisms/inquiry-form/quality-item/QualityReviewTextFormItem';
import QualityReviewTextForm
    from '../../components/organisms/inquiry-form/quality-form/QualityReviewTextForm';
import QualityFileForm
    from '../../components/organisms/inquiry-form/quality-form/QualityFileForm';
import QualityFileFormItem
    from '../../components/organisms/inquiry-form/quality-item/QualityFileFormItem';
import { InqTableContainer } from '../../assets/css/Inquiry.css';
import {
    postNotificationByCustomers,
    postNotificationByManagers,
} from '../../apis/api/notification';
import { useAuth } from '../../hooks/useAuth';
import { CircularProgress, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { QualityCompleteAlert } from '../../utils/actions';

function QualityManagerInqItem() { // 품질담당자 Inquiry 조회 페이지
    const { id } = useParams();
    const { userId, role } = useAuth();
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
    const [qualityData, setQualityData] = useState(null);
    const [isQualityItem, setIsQualityItem] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(null);
    const [requestTitle, setRequestTitle] = useState(null);

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
        qualityManagerName: '',
        files: [],
        industry: '',
        inquiryId: null,
        inquiryType: '',
        fileName: '',
        filePath: '',
        name: '',
        email: '',
        phone: '',
        productType: '',
        progress: '',
        salesPerson: '',
        lineItemResponseDTOs: [],

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
    });

    const getInquiryDataDetail = async () => {
        try {
            const response = await getInquiryDetailByManagers(realId);
            setInquiriesDataDetail(response.data);
            setCurrentProgress(response.data.progress);
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
        try {
            const response = await getUserInfoByCustomers(formData.customerId);
            setUserInfo(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('Error fetching User Info:', error);
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                getInquiryDataDetail(),
                getUserInfo(),
                getQuality(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (inquiriesDataDetail && userInfo) {
            setFormData(prevFormData => ({
                ...prevFormData,
                additionalRequests: inquiriesDataDetail.additionalRequests || '',
                corporate: inquiriesDataDetail.corporate || '',
                corporationCode: inquiriesDataDetail.corporationCode || '',
                country: inquiriesDataDetail.country || '',
                customerCode: userInfo.data.customerCode || '',
                customerId: inquiriesDataDetail.customerId || null,
                customerName: inquiriesDataDetail.customerName || '',
                customerRequestDate: inquiriesDataDetail.customerRequestDate || '',
                salesManagerName: inquiriesDataDetail?.salesManagerSummaryDto.name || '',
                qualityManagerName: inquiriesDataDetail?.qualityManagerSummaryDto.name || '',
                files: inquiriesDataDetail.files || [],
                industry: inquiriesDataDetail.industry || '',
                inquiryId: inquiriesDataDetail.inquiryId || null,
                inquiryType: inquiriesDataDetail.inquiryType || '',
                fileName: inquiriesDataDetail.fileName || '',
                filePath: inquiriesDataDetail.filePath || '',
                name: inquiriesDataDetail.name || '',
                email: userInfo.data.email || '',
                phone: userInfo.data.phone || '',
                productType: inquiriesDataDetail.productType || '',
                progress: inquiriesDataDetail.progress || '',
                salesPerson: inquiriesDataDetail.salesPerson || '',
                lineItemResponseDTOs: inquiriesDataDetail.lineItemResponseDTOs || [],
                finalResult: qualityData.qualityReviewInfo.finalResult || '',
                finalResultDetails: qualityData.qualityReviewInfo.finalResultDetails || '',
                standard: qualityData.qualityReviewInfo.standard || '',
                orderCategory: qualityData.qualityReviewInfo.orderCategory || '',
                coatingMetalQuantity: qualityData.qualityReviewInfo.coatingMetalQuantity || '',
                coatingOilQuantity: qualityData.qualityReviewInfo.coatingOilQuantity || '',
                thicknessTolerance: qualityData.qualityReviewInfo.thicknessTolerance || '',
                orderEdge: qualityData.qualityReviewInfo.orderEdge || '',
                customerQReq: qualityData.qualityReviewInfo.customerQReq || '',
                availableLab: qualityData.qualityReviewInfo.availableLab || '',
                qualityComments: qualityData.qualityComments || '',
                qualityFiles: qualityData.qualityFiles || [],
                qualityFileName: qualityData.qualityReviewInfo.fileName || '',
                qualityFilePath: qualityData.qualityReviewInfo.filePath || '',
            }));
        }
    }, [inquiriesDataDetail, userInfo]);

    const handleQualitySubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (id) {
            try {
                const qualityResponse = await postQuality(realId, {
                    ...formData,
                    qualityReviewInfo: {
                        finalResult: formData.finalResult,
                        finalResultDetails: formData.finalResultDetails,
                        standard: formData.standard,
                        orderCategory: formData.orderCategory,
                        coatingMetalQuantity: formData.coatingMetalQuantity,
                        coatingOilQuantity: formData.coatingOilQuantity,
                        thicknessTolerance: formData.thicknessTolerance,
                        orderEdge: formData.orderEdge,
                        customerQReq: formData.customerQReq,
                        availableLab: formData.availableLab,
                    },
                    qualityComments: formData.qualityComments,
                });
                await postNotificationByCustomers(formData.customerId, {
                    notificationContents:
                        `${inquiriesDataDetail.name}님의 Inquiry 문의 품질 검토가 완료되었습니다.`,
                })
                const response = await getInquiryDetailByManagers(realId);
                await postNotificationByManagers(response.data.salesManagerSummaryDto.userId, {
                    notificationContents:
                        `Inquiry ${realId}번 문의의 품질 검토가 완료되었습니다. 최종 검토 내용과 OfferSheet를 작성해 주세요.`,
                })
                console.log('Quality posted successfully:', qualityResponse);
                updateProgress("QUALITY_REVIEW_COMPLETED");
                QualityCompleteAlert();
                setTimeout(() => {
                    navigate(`/inq-list/${role}`);
                }, '1500');
            } catch (error) {
                console.log('Error posting quality:', error);
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
        if (currentProgress === 'QUALITY_REVIEW_REQUEST') {
            setRequestTitle('Inquiry 상세조회 및 품질검토4');
        } else if (currentProgress === 'QUALITY_REVIEW_RESPONSE') {
            setRequestTitle('Inquiry 상세조회 및 품질검토6');
        } else {
            setRequestTitle('Inquiry 조회8');
        }
    }, [currentProgress]);

    const handlePreviewReviewData = () => {
        handleFormDataChange('finalResult', 'Ready for review.');
        handleFormDataChange('finalResultDetails', 'Final inspection completed.');
        handleFormDataChange('standard', 'ISO 9001');
        handleFormDataChange('orderCategory', 'Steel Products');
        handleFormDataChange('coatingMetalQuantity', '200 kg');
        handleFormDataChange('coatingOilQuantity', '25 liters');
        handleFormDataChange('thicknessTolerance', '±0.3 mm');
        handleFormDataChange('orderEdge', 'Beveled');
        handleFormDataChange('customerQReq', 'High Durability');
        handleFormDataChange('availableLab', 'Testing Lab B');
        handleFormDataChange('qualityComments', '제품은 모든 품질 기준을 충족하며 결함이 발견되지 않았습니다.');
    }

    return (
        <div className={InqTableContainer}>
            <ManagerInqPath
                largeCategory={'Inquiry'}
                mediumCategory={'품질설계연계조회'}
                smallCategory={id}
                role={'quality'}
            />

            {loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    <RequestBar
                        requestBarTitle={requestTitle}
                        onQualityCompleteSubmit={handleSubmit(handleQualitySubmit)}
                    />
                    <ManagerBasicInfoForm
                        formData={inquiriesDataDetail}
                        salesManagerName={inquiriesDataDetail?.salesManagerSummaryDto?.name || '-'}
                        qualityManagerName={inquiriesDataDetail?.qualityManagerSummaryDto?.name || '-'}
                        progress={currentProgress}
                    />
                    <InquiryHistoryFormItem
                        productType={inquiriesDataDetail?.productType}
                        lineItemData={formData.lineItemResponseDTOs}
                    />
                    <AdditionalRequestForm formData={inquiriesDataDetail} />

                    {isQualityItem ? (
                        <QualityReviewTextFormItem formData={qualityData} />
                    ) : (
                        <QualityReviewTextForm formData={formData}
                                               handleFormDataChange={handleFormDataChange}
                                               isPreviewData={true}
                                               handleIsPreview={handlePreviewReviewData}
                                               register={register}
                                               errors={errors}
                        />
                    )}

                    {isQualityItem ? (
                        <QualityFileFormItem fileForm={'품질검토 첨부파일'}
                                             formData={qualityData} />
                    ) : (
                        <QualityFileForm fileForm={'품질검토 파일첨부'}
                                         formData={formData}
                                         handleFormDataChange={handleFormDataChange}
                        />
                    )}

                    <FileFormItem
                        fileForm={'첨부파일'}
                        formData={inquiriesDataDetail}
                    />
                </>
            )}
        </div>
    )
}

export default QualityManagerInqItem;
