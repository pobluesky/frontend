export const productTypes = {
    "CAR": {
        "lineItemId": { label: "번호", type: "int" },
        "lab": { label: "가능소", type: "enum", options: ["POHANG", "GWANGYANG"] },
        "kind": { label: "품종", type: "enum", options: ["SEDAN", "SUV", "TRUCK"] },
        "standardOrg": { label: "규격기관", type: "enum", options: ["ASTM", "ANSI"] },
        "salesVehicleName": { label: "판매차종명", type: "string" },
        "partName": { label: "부품명", type: "string" },
        "ixPlate": { label: "내외판", type: "enum", options: ["DASH_PANEL", "FLOOR_PANEL", "DOOR_PANEL", "TRUNK_LID"] },
        "thickness": { label: "두께", type: "string" },
        "width": { label: "폭", type: "string" },
        "quantity": { label: "수량", type: "int" },
        "expectedDeliveryDate": { label: "희망납기일", type: "date" },
        "transportationDestination": { label: "운송목적지", type: "string" },
        "orderEdge": { label: "주문(Edge)", type: "string" },
        "tolerance": { label: "공차", type: "string" },
        "annualCost": { label: "연소요량", type: "string" }
    },
    "COLD_ROLLED": {
        "lineItemId": { label: "번호", type: "int" },
        "kind": { label: "품종", type: "enum", options: ["CR", "CRC", "CRCA"] },
        "inqName": { label: "INQ규격명", type: "enum", options: ["JS_SI123", "JS_SI456", "JS_SI789", "JS_SI321", "JS_SI654", "JS_SI987"] },
        "orderCategory": { label: "주문용도", type: "string" },
        "thickness": { label: "두께", type: "string" },
        "width": { label: "폭", type: "string" },
        "quantity": { label: "수량", type: "int" },
        "orderEdge": { label: "주문(edge)", type: "string" },
        "inDiameter": { label: "내경", type: "string" },
        "outDiameter": { label: "외경", type: "string" },
        "sleeveThickness": { label: "슬리브두께", type: "string" },
        "expectedDeadline": { label: "희망납기일", type: "date" },
        "tensileStrength": { label: "인장강도", type: "string" },
        "elongationRatio": { label: "연신율", type: "string" },
        "hardness": { label: "경도", type: "string" }
    },
    "HOT_ROLLED": {
        "lineItemId": { label: "번호", type: "int" },
        "kind": { label: "품종", type: "enum", options: ["HR", "HRC", "HRPO"] },
        "inqName": { label: "INQ규격명", type: "enum", options: ["JS_SI123", "JS_SI456", "JS_SI789", "JS_SI321", "JS_SI654", "JS_SI987"] },
        "orderCategory": { label: "주문용도", type: "string" },
        "thickness": { label: "두께", type: "string" },
        "width": { label: "폭", type: "string" },
        "hardness": { label: "경도", type: "string" },
        "flatness": { label: "평탄도", type: "string" },
        "orderEdge": { label: "주문(edge)", type: "string" },
        "quantity": { label: "수량", type: "int" },
        "yieldingPoint": { label: "항복점", type: "string" },
        "tensileStrength": { label: "인장강도", type: "string" },
        "elongationRatio": { label: "연신율", type: "string" },
        "camber": { label: "캠버", type: "string" },
        "annualCost": { label: "연소요량", type: "string" }
    },
    "THICK_PLATE": {
        "lineItemId": { label: "번호", type: "int" },
        "orderPurpose": { label: "일반사항", type: "string" },
        "orderInfo": { label: "주문정보", type: "string" },
        "ladleIngredient": { label: "성분(ladle)", type: "string" },
        "productIngredient": { label: "성분(product)", type: "string" },
        "seal": { label: "인장", type: "string" },
        "grainSizeAnalysis": { label: "입도시험", type: "boolean" },
        "show": { label: "충격", type: "string" },
        "extraShow": { label: "추가충격", type: "string" },
        "agingShow": { label: "시효충격", type: "string" },
        "curve": { label: "굴곡", type: "string" },
        "additionalRequests": { label: "추가요청사항", type: "string" },
        "hardness": { label: "경도", type: "string" },
        "dropWeightTest": { label: "낙하충격시험", type: "boolean" },
        "ultrasonicTransducer": { label: "초음파탐상시험", type: "boolean" }
    },
    "WIRE_ROD": {
        "lineItemId": { label: "번호", type: "int" },
        "kind": { label: "품종", type: "enum", options: ["SWRH", "SWRM", "SWRS"] },
        "inqName": { label: "INQ규격명", type: "enum", options: ["JS_SI123", "JS_SI456", "JS_SI789", "JS_SI321", "JS_SI654", "JS_SI987"] },
        "orderCategory": { label: "주문용도", type: "string" },
        "diameter": { label: "직경", type: "string" },
        "quantity": { label: "수량", type: "int" },
        "expectedDeadline": { label: "희망납기일", type: "date" },
        "initialQuantity": { label: "초도물량", type: "int" },
        "customerProcessing": { label: "고객사가공공정", type: "string" },
        "finalUse": { label: "최종용도", type: "string" },
        "transportationDestination": { label: "운송목적지", type: "string" },
        "annualCost": { label: "연소요량", type: "string" },
        "legalRegulatoryReview": { label: "법적규제사항검토", type: "string" },
        "legalRegulatoryReviewDetail": { label: "법적규제사항검토상세", type: "string" },
        "finalCustomer": { label: "최종고객사", type: "string" }
    }
};

export const progressOptions = [
    { label: '전체', value: '' },
    { label: '문의제출', value: 'SUBMIT' },
    { label: '문의접수', value: 'RECEIPT' },
    { label: '1차검토완료', value: 'FIRST_REVIEW_COMPLETED' },
    { label: '품질검토요청', value: 'QUALITY_REVIEW_REQUEST' },
    { label: '품질검토접수', value: 'QUALITY_REVIEW_RESPONSE' },
    { label: '품질검토완료', value: 'QUALITY_REVIEW_COMPLETED' },
    { label: '최종검토완료', value: 'FINAL_REVIEW_COMPLETED' },
];

export const sortOptions = [
    { label: '최신순', value: 'LATEST' },
    { label: '과거순', value: 'OLDEST' },
];

export const productTypeOptions = [
    { label: 'ALL', value: '' },
    { label: '자동차', value: 'CAR' },
    { label: '열연', value: 'HOT_ROLLED' },
    { label: '냉연', value: 'COLD_ROLLED' },
    { label: '후판', value: 'THICK_PLATE' },
    { label: '선재', value: 'WIRE_ROD' },
];

export const inquiryTypeOptions = [
    { label: 'ALL', value: '' },
    { label: '견적 문의', value: 'QUOTE_INQUIRY' },
    { label: '품질+견적 문의', value: 'COMMON_INQUIRY' },
];

export const IndustryOptions = [
    { label: 'ALL', value: '' },
    { label: 'Automobile', value: 'AUTOMOBILE' },
    { label: 'Others', value: 'OTHERS' },
    { label: 'Construction', value: 'CONSTRUCTION' },
    { label: 'Distribution', value: 'DISTRIBUTION' },
    { label: 'Electric', value: 'ELECTRIC' },
    { label: 'Furniture', value: 'FURNITURE' },
    { label: 'Plating', value: 'PLATING' },
    { label: 'High-Carbon', value: 'HIGH_CARBON' },
    { label: 'Kitchen', value: 'KITCHEN' },
    { label: 'Low-Carbon', value: 'LOW_CARBON' },
    { label: 'Machinery', value: 'MACHINERY' },
    { label: 'Pipe', value: 'PIPE' },
    { label: 'Rerolling', value: 'REROLLING' },
    { label: 'Shipbuilding', value: 'SHIPBUILDING' },
    { label: 'Transportation', value: 'TRANSPORTATION' },
    { label: 'Vessel', value: 'VESSEL' },
    { label: 'Beam', value: 'BEAM' },
];

export const Departments = {
    CRM: "냉연마케팅실",
    HWM: "열연선재마케팅실",
    EM: "에너지조선마케팅실",
    CMM: "자동차소재마케팅실",
    SFM: "강건재가전마케팅실",
    SM: "스테인리스마케팅실",
};

// 오퍼시트 시연용 데이터
export const OfferSheetReceipts = [
    {
        "product": "선재",
        "specification": "ASTM A510",
        "surfaceFinish": "Cold Drawn",
        "usage": "Automotive",
        "thickness": "2mm",
        "diameter": "6mm",
        "width": "10mm",
        "quantity": "1500",
        "price": "500",
        "unitMinWeight": "300",
        "unitMaxWeight": "350",
        "edge": "Smooth Edge"
    },
    {
        "product": "선재",
        "specification": "EN 10270",
        "surfaceFinish": "Galvanized",
        "usage": "Construction",
        "thickness": "5mm",
        "diameter": "8mm",
        "width": "15mm",
        "quantity": "2000",
        "price": "700",
        "unitMinWeight": "600",
        "unitMaxWeight": "650",
        "edge": "Clean Cut"
    },
    {
        "product": "선재",
        "specification": "JIS G3505",
        "surfaceFinish": "Hot Rolled",
        "usage": "Spring",
        "thickness": "3mm",
        "diameter": "5mm",
        "width": "20mm",
        "quantity": "1000",
        "price": "800",
        "unitMinWeight": "400",
        "unitMaxWeight": "450",
        "edge": "Rounded Edge"
    },
    {
        "product": "선재",
        "specification": "ISO 16120",
        "surfaceFinish": "Pickled",
        "usage": "Wire Rope",
        "thickness": "4mm",
        "diameter": "7mm",
        "width": "25mm",
        "quantity": "1200",
        "price": "600",
        "unitMinWeight": "350",
        "unitMaxWeight": "400",
        "edge": "Mill Edge"
    },
    {
        "product": "선재",
        "specification": "ASTM A228",
        "surfaceFinish": "Cold Drawn",
        "usage": "Mechanical Springs",
        "thickness": "1mm",
        "diameter": "3mm",
        "width": "5mm",
        "quantity": "800",
        "price": "1000",
        "unitMinWeight": "250",
        "unitMaxWeight": "300",
        "edge": "Square Edge"
    },
    {
        "product": "선재",
        "specification": "EN 10016-2",
        "surfaceFinish": "Bright",
        "usage": "Welding Wire",
        "thickness": "2.5mm",
        "diameter": "1.5mm",
        "width": "3mm",
        "quantity": "500",
        "price": "900",
        "unitMinWeight": "150",
        "unitMaxWeight": "200",
        "edge": "Flat Edge"
    },
    {
        "product": "선재",
        "specification": "GB/T 3429",
        "surfaceFinish": "Annealed",
        "usage": "Piano Wire",
        "thickness": "1.5mm",
        "diameter": "4mm",
        "width": "6mm",
        "quantity": "600",
        "price": "1100",
        "unitMinWeight": "100",
        "unitMaxWeight": "150",
        "edge": "Tapered Edge"
    }
]