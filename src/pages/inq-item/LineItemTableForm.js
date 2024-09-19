import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { postInquiry } from '../../apis/api/inquiry';
import { InquiryCompleteAlert } from '../../utils/actions';
import { useForm } from 'react-hook-form';
import InquiryNewForm from '../../components/organisms/inquiry-form/InquiryNewForm';
import InquiryHistoryForm from '../../components/organisms/inquiry-form/InquiryHistoryForm';
import RequestBar from '../../components/molecules/RequestBar';

const LineItemTableForm = () => {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [formData, setFormData] = useState({
        additionalRequests: '',
        corporate: '',
        corporationCode: '',
        country: '',
        customerCode: '',
        customerId: userId,
        customerName: '',
        customerRequestDate: '',
        industry: '',
        inquiryId: null,
        inquiryType: '',
        productType: '',
        progress: 'RECEIPT',
        salesPerson: '',
        lineItemResponseDTOs: [],
    });

    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleInquirySubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        try {
            const response = await postInquiry(userId, {
                ...formData,
                lineItemRequestDTOs: formData.lineItemRequestDTOs,
            });
            console.log('Inquiry posted successfully:', response);
            InquiryCompleteAlert();
            setTimeout(() => {
                navigate(`/inq-list/${role}`);
            }, '2000');
        } catch (error) {
            console.log('Error submitting inquiry:', error);
        }
    };

    return (
        <div>
            <RequestBar requestBarTitle={"Inquiry 등록0"} role={"customer"} onSubmit={handleSubmit(handleInquirySubmit)} />
            <InquiryNewForm
                register={register}
                errors={errors}
                formData={formData}
                handleFormDataChange={handleFormDataChange}
            />
            <InquiryHistoryForm
                productType={formData.productType}
                lineItemData={formData.lineItemResponseDTOs}
                onLineItemsChange={(lineItems) => handleFormDataChange('lineItemResponseDTOs', lineItems)}
            />
        </div>
    );
};

export default LineItemTableForm;
