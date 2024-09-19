import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InquiryHistoryFormItem } from '../../components/organisms/inquiry-form'
import { getInquiryDetailByManagers } from '../../apis/api/inquiry';
import ManagerBasicInfoForm from '../../components/organisms/inquiry-form/ManagerBasicInfoForm';
import AdditionalRequestForm from '../../components/organisms/inquiry-form/AdditionalRequestForm';

const LineItemTableItem = () => {
    const { id } = useParams();

    const [inquiriesDataDetail, setInquiriesDataDetail] = useState(null);
    const [formData, setFormData] = useState({
        additionalRequests: '',
        corporate: '',
        corporationCode: '',
        country: '',
        customerCode: '',
        customerId: null,
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
        progress: '',
        salesPerson: '',
        lineItemResponseDTOs: [],
    });

    const getInquiryDataDetail = async () => {
        try {
            const response = await getInquiryDetailByManagers(id);
            setInquiriesDataDetail(response.data);
            setFormData(prevData => ({
                ...prevData,
                customerId: response.data.customerId,
                lineItemResponseDTOs: response.data.lineItemResponseDTOs || []
            }));
        } catch (error) {
            console.log('Error fetching InquiryDetail:', error);
        }
    };

    useEffect(() => {
        getInquiryDataDetail();
    }, [id]);

    useEffect(() => {
        if (inquiriesDataDetail) {
            setFormData(prevFormData => ({
                ...prevFormData,
                additionalRequests: inquiriesDataDetail.additionalRequests || '',
                corporate: inquiriesDataDetail.corporate || '',
                corporationCode: inquiriesDataDetail.corporationCode || '',
                country: inquiriesDataDetail.country || '',
                customerId: inquiriesDataDetail.customerId || null,
                customerName: inquiriesDataDetail.customerName || '',
                customerRequestDate: inquiriesDataDetail.customerRequestDate || '',
                files: inquiriesDataDetail.files || [],
                industry: inquiriesDataDetail.industry || '',
                inquiryId: inquiriesDataDetail.inquiryId || null,
                inquiryType: inquiriesDataDetail.inquiryType || '',
                name: inquiriesDataDetail.name || '',
                productType: inquiriesDataDetail.productType || '',
                progress: inquiriesDataDetail.progress || '',
                salesPerson: inquiriesDataDetail.salesPerson || '',
                lineItemResponseDTOs: inquiriesDataDetail.lineItemResponseDTOs || [],
            }));
        }
    }, [inquiriesDataDetail]);

    return (
        <>
            <ManagerBasicInfoForm formData={inquiriesDataDetail} />
            <InquiryHistoryFormItem
                productType={formData.productType}
                lineItemData={formData.lineItemResponseDTOs}
                onLineItemsChange={(newLineItems) => setFormData(prev => ({ ...prev, lineItemResponseDTOs: newLineItems }))}
            />
            <AdditionalRequestForm formData={inquiriesDataDetail} />
        </>
    );
};

export default LineItemTableItem;
