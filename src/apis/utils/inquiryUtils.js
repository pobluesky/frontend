// inquiry summary 데이터 가공
export const processInquiries = (data) => {
    return data.map((inquiry) => {
        let progressText;
        switch (inquiry.progress) {
            case 'SUBMIT':
                progressText = '문의제출';
                break;
            case 'RECEIPT':
                progressText = '문의접수';
                break;
            case 'FIRST_REVIEW_COMPLETED':
                progressText = '1차검토완료';
                break;
            case 'QUALITY_REVIEW_REQUEST':
                progressText = '품질검토요청';
                break;
            case 'QUALITY_REVIEW_RESPONSE':
                progressText = '품질검토접수';
                break;
            case 'QUALITY_REVIEW_COMPLETED':
                progressText = '품질검토완료';
                break;
            case 'FINAL_REVIEW_COMPLETED':
                progressText = '최종검토완료';
                break;
            default:
                progressText = '-';
        }

        let inquiryTypeText;
        switch (inquiry.inquiryType) {
            case 'QUOTE_INQUIRY':
                inquiryTypeText = '견적 문의';
                break;
            case 'COMMON_INQUIRY':
                inquiryTypeText = '품질+견적 문의';
                break;
            default:
                inquiryTypeText = '-';
        }

        let productTypeText;
        switch (inquiry.productType) {
            case 'CAR':
                productTypeText = '자동차';
                break;
            case 'HOT_ROLLED':
                productTypeText = '열연';
                break;
            case 'COLD_ROLLED':
                productTypeText = '냉연';
                break;
            case 'THICK_PLATE':
                productTypeText = '후판';
                break;
            case 'WIRE_ROD':
                productTypeText = '선재';
                break;
            default:
                productTypeText = '-';
        }

        let countryText;
        switch (inquiry.country) {
            case 'KOREA':
                countryText = '한국';
                break;
            case 'USA':
                countryText = '미국';
                break;
            case 'JAPAN':
                countryText = '일본';
                break;
            case 'CANADA':
                countryText = '캐나다';
                break;
            case 'CHINA':
                countryText = '중국';
                break;
            case 'GERMANY':
                countryText = '독일';
                break;
            case 'FRANCE':
                countryText = '프랑스';
                break;
            default:
                countryText = '-';
        }

        let industryText;
        switch (inquiry.industry) {
            case 'AUTOMOBILE':
                industryText = 'Automobile';
                break;
            case 'OTHERS':
                industryText = 'Others';
                break;
            case 'CONSTRUCTION':
                industryText = 'Construction';
                break;
            case 'DISTRIBUTION':
                industryText = 'Distribution';
                break;
            case 'ELECTRIC':
                industryText = 'Electric';
                break;
            case 'FURNITURE':
                industryText = 'Furniture';
                break;
            case 'PLATING':
                industryText = 'Plating';
                break;
            case 'HIGH_CARBON':
                industryText = 'High-Carbon';
                break;
            case 'KITCHEN':
                industryText = 'Kitchen';
                break;
            case 'LOW_CARBON':
                industryText = 'Low-Carbon';
                break;
            case 'MACHINERY':
                industryText = 'Machinery';
                break;
            case 'PIPE':
                industryText = 'Pipe';
                break;
            case 'REROLLING':
                industryText = 'Rerolling';
                break;
            case 'SHIPBUILDING':
                industryText = 'Shipbuilding';
                break;
            case 'TRANSPORTATION':
                industryText = 'Transportation';
                break;
            case 'VESSEL':
                industryText = 'Vessel';
                break;
            case 'BEAM':
                industryText = 'Beam';
                break;
            default:
                industryText = '-';
        }

        let salesManagerNameText;
        switch (inquiry.salesManagerName) {
            case null:
                salesManagerNameText = '-';
                break;
            default:
                salesManagerNameText = inquiry.salesManagerName;
        }

        let qualityManagerNameText;
        switch (inquiry.qualityManagerName) {
            case null:
                qualityManagerNameText = '-';
                break;
            default:
                qualityManagerNameText = inquiry.qualityManagerName;
        }

        return {
            customerName: inquiry.customerName,
            salesManagerName: salesManagerNameText,
            qualityManagerName: qualityManagerNameText,
            inquiryId: inquiry.inquiryId,
            inquiryType: inquiryTypeText,
            productType: productTypeText,
            progress: progressText,
            salesPerson: inquiry.salesPerson,
            country: countryText,
            corporate: inquiry.corporate,
            corporationCode: inquiry.corporationCode,
            industry: industryText,
        };
    });
};

// Inquiry 데이터 LineItem 포맷 변환 함수 (post, put)
export const processInquiryData = (data) => {
    const { productType, lineItemRequestDTOs = [], ...rest } = data;

    let formattedData;
    switch (productType) {
        case 'CAR':
            formattedData = {
                ...rest,
                productType,
                lineItemRequestDTOs: lineItemRequestDTOs.map((item) => ({
                    lab: item.lab,
                    kind: item.kind,
                    standardOrg: item.standardOrg,
                    salesVehicleName: item.salesVehicleName,
                    partName: item.partName,
                    ixPlate: item.ixPlate,
                    thickness: item.thickness,
                    width: item.width,
                    quantity: item.quantity,
                    expectedDeliveryDate: item.expectedDeliveryDate,
                    transportationDestination: item.transportationDestination,
                    orderEdge: item.orderEdge,
                    tolerance: item.tolerance,
                    annualCost: item.annualCost,
                })),
            };
            break;
        case 'COLD_ROLLED':
            formattedData = {
                ...rest,
                productType,
                lineItemRequestDTOs: lineItemRequestDTOs.map((item) => ({
                    kind: item.kind,
                    inqName: item.inqName,
                    orderCategory: item.orderCategory,
                    thickness: item.thickness,
                    width: item.width,
                    quantity: item.quantity,
                    orderEdge: item.orderEdge,
                    inDiameter: item.inDiameter,
                    outDiameter: item.outDiameter,
                    expectedDeadline: item.expectedDeadline,
                    sleeveThickness: item.sleeveThickness,
                    tensileStrength: item.tensileStrength,
                    elongationRatio: item.elongationRatio,
                    hardness: item.hardness,
                })),
            };
            break;
        case 'HOT_ROLLED':
            formattedData = {
                ...rest,
                productType,
                lineItemRequestDTOs: lineItemRequestDTOs.map((item) => ({
                    kind: item.kind,
                    inqName: item.inqName,
                    orderCategory: item.orderCategory,
                    thickness: item.thickness,
                    width: item.width,
                    hardness: item.hardness,
                    flatness: item.flatness,
                    orderEdge: item.orderEdge,
                    quantity: item.quantity,
                    yieldingPoint: item.yieldingPoint,
                    tensileStrength: item.tensileStrength,
                    elongationRatio: item.elongationRatio,
                    camber: item.camber,
                    annualCost: item.annualCost,
                })),
            };
            break;
        case 'THICK_PLATE':
            formattedData = {
                ...rest,
                productType,
                lineItemRequestDTOs: lineItemRequestDTOs.map((item) => ({
                    orderPurpose: item.orderPurpose,
                    orderInfo: item.orderInfo,
                    ladleIngredient: item.ladleIngredient,
                    productIngredient: item.productIngredient,
                    seal: item.seal,
                    grainSizeAnalysis: item.grainSizeAnalysis,
                    show: item.show,
                    extraShow: item.extraShow,
                    agingShow: item.agingShow,
                    curve: item.curve,
                    additionalRequests: item.additionalRequests,
                    hardness: item.hardness,
                    dropWeightTest: item.dropWeightTest,
                    ultrasonicTransducer: item.ultrasonicTransducer,
                })),
            };
            break;
        case 'WIRE_ROD':
            formattedData = {
                ...rest,
                productType,
                lineItemRequestDTOs: lineItemRequestDTOs.map((item) => ({
                    kind: item.kind,
                    inqName: item.inqName,
                    orderCategory: item.orderCategory,
                    diameter: item.diameter,
                    quantity: item.quantity,
                    expectedDeadline: item.expectedDeadline,
                    initialQuantity: item.initialQuantity,
                    customerProcessing: item.customerProcessing,
                    finalUse: item.finalUse,
                    transportationDestination: item.transportationDestination,
                    annualCost: item.annualCost,
                    legalRegulatoryReview: item.legalRegulatoryReview,
                    legalRegulatoryReviewDetail: item.legalRegulatoryReviewDetail,
                    finalCustomer: item.finalCustomer,
                })),
            };
            break;
        default:
            throw new Error('Unknown productType');
    }
    return formattedData;
};

// FormData 객체 생성 함수 - inquiry
export const createFormInquiryData = (formData) => {
    const form = new FormData();

    const inquiryData = processInquiryData(formData);
    delete inquiryData.files;

    form.append(
        'inquiry',
        new Blob([JSON.stringify(inquiryData)], { type: 'application/json' }),
    );

    if (formData.files) {
        form.append('files', formData.files);
    }
    return form;
};

// FormData 객체 생성 함수 - quality
export const createFormQualityData = (formData) => {
    const form = new FormData();

    form.append(
        'quality',
        new Blob([JSON.stringify(formData)], { type: 'application/json' }),
    );

    if (formData.qualityFiles) {
        form.append('files', formData.qualityFiles);
    }

    return form;
};

// 과거 이력 조회 데이터 변환
export const processHistoryData = (data) => {
    return data?.map((inquiry) => {
        let productTypeText;
        switch (inquiry.productType) {
            case 'CAR':
                productTypeText = '자동차';
                break;
            case 'HOT_ROLLED':
                productTypeText = '열연';
                break;
            case 'COLD_ROLLED':
                productTypeText = '냉연';
                break;
            case 'THICK_PLATE':
                productTypeText = '후판';
                break;
            case 'WIRE_ROD':
                productTypeText = '선재';
                break;
            default:
                productTypeText = '-';
        }

        let industryText;
        switch (inquiry.industry) {
            case 'AUTOMOBILE':
                industryText = 'Automobile';
                break;
            case 'OTHERS':
                industryText = 'Others';
                break;
            case 'CONSTRUCTION':
                industryText = 'Construction';
                break;
            case 'DISTRIBUTION':
                industryText = 'Distribution';
                break;
            case 'ELECTRIC':
                industryText = 'Electric';
                break;
            case 'FURNITURE':
                industryText = 'Furniture';
                break;
            case 'PLATING':
                industryText = 'Plating';
                break;
            case 'HIGH_CARBON':
                industryText = 'High-Carbon';
                break;
            case 'KITCHEN':
                industryText = 'Kitchen';
                break;
            case 'LOW_CARBON':
                industryText = 'Low-Carbon';
                break;
            case 'MACHINERY':
                industryText = 'Machinery';
                break;
            case 'PIPE':
                industryText = 'Pipe';
                break;
            case 'REROLLING':
                industryText = 'Rerolling';
                break;
            case 'SHIPBUILDING':
                industryText = 'Shipbuilding';
                break;
            case 'TRANSPORTATION':
                industryText = 'Transportation';
                break;
            case 'VESSEL':
                industryText = 'Vessel';
                break;
            case 'BEAM':
                industryText = 'Beam';
                break;
            default:
                industryText = '-';
        }

        return {
            inquiryId: inquiry.inquiryId,
            salesPerson: inquiry.salesPerson,
            industry: industryText,
            customerName: inquiry.customerName,
            productType: productTypeText,
            lineItemList: inquiry.lineItemList,
            isFavorite: inquiry.isFavorite,
        };
    });
};
