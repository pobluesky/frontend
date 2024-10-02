import React, { useEffect, useState } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DepartmentInquiryCount from '../../components/molecules/DepartmentInquiryCount';
import { getMonthlyDepartmentCounts } from '../../apis/api/chart';
import { Departments } from '../../utils/inquiry';

const processCountInquiries = (totalCounts, previousCounts) => {
    return Object.entries(Departments).map(([key, koreanDepartmentName]) => {
        const totalCount = totalCounts.find(([departmentName]) => departmentName === key);
        const inquiryCount = totalCount ? totalCount[1] : 0;

        const previousCount = previousCounts.find(([departmentName]) => departmentName === key);
        const previousInquiryCount = previousCount ? previousCount[1] : 0;

        const changeRate = calculateChangeRate(inquiryCount, previousInquiryCount);

        const inquiryDifference = inquiryCount - previousInquiryCount;

        return {
            departmentName: koreanDepartmentName,
            inquiryCount,
            changeRate,
            previousCount: Math.abs(inquiryDifference),
            inquiryDifference,
            isNoInquiry: inquiryCount === 0,
        };
    });
};

const calculateChangeRate = (inquiryCount, previousInquiryCount) => {
    if (previousInquiryCount === 0) {
        return inquiryCount === 0 ? 0 : 100;
    }

    const changeRate = ((inquiryCount - previousInquiryCount) / previousInquiryCount) * 100;
    return changeRate;
};

const DepartmentByMonth = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const year = currentMonth === 1 ? currentYear - 1 : currentYear;

    const [departmentsData, setDepartmentsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(year.toString());
    const [selectedMonth, setSelectedMonth] = useState(previousMonth.toString().padStart(2, '0'));

    const fetchCountByDepartment = async (year, month) => {
        const date = `${year}-${month}`;

        try {
            const currentResponse = await getMonthlyDepartmentCounts(date);
            const previousResponse = await getMonthlyDepartmentCounts(
                `${year}-${
                    month === '01' ? '12' : (parseInt(month, 10) - 1).toString().padStart(2, '0')
                }`
            );

            const totalCounts = currentResponse.total || [];
            const previousCounts = previousResponse.total || [];

            const newDepartmentsData = processCountInquiries(totalCounts, previousCounts);

            setDepartmentsData(newDepartmentsData);
        } catch (error) {
            console.log('부서별 Inquiry 건수 조회 실패: ', error);
        }
    };

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        fetchCountByDepartment(year, selectedMonth);
    };

    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);
        fetchCountByDepartment(selectedYear, month);
    };

    useEffect(() => {
        fetchCountByDepartment(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={4} sm={2} sx={{ marginBottom: 2 }}>
                    <FormControl fullWidth sx={{ zIndex: 0 }}>
                        <InputLabel
                            id="year-select-label"
                            shrink={selectedYear !== ""}
                        >
                            연도 선택
                        </InputLabel>
                        <Select
                            labelId="year-select-label"
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="연도 선택"
                            sx={{
                                backgroundColor: 'white',
                            }}
                        >
                            <MenuItem value="2023">2023년</MenuItem>
                            <MenuItem value="2024">2024년</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4} sm={2} sx={{ marginBottom: 2 }}>
                    <FormControl fullWidth sx={{ zIndex: 0 }}>
                        <InputLabel
                            id="month-select-label"
                            shrink={selectedMonth !== ""}
                        >
                            월 선택
                        </InputLabel>
                        <Select
                            labelId="month-select-label"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            label="월 선택"
                            sx={{
                                backgroundColor: 'white',
                            }}
                        >
                            <MenuItem value="01">1월</MenuItem>
                            <MenuItem value="02">2월</MenuItem>
                            <MenuItem value="03">3월</MenuItem>
                            <MenuItem value="04">4월</MenuItem>
                            <MenuItem value="05">5월</MenuItem>
                            <MenuItem value="06">6월</MenuItem>
                            <MenuItem value="07">7월</MenuItem>
                            <MenuItem value="08">8월</MenuItem>
                            <MenuItem value="09">9월</MenuItem>
                            <MenuItem value="10">10월</MenuItem>
                            <MenuItem value="11">11월</MenuItem>
                            <MenuItem value="12">12월</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {departmentsData.map((department, index) => (
                    <Grid item xs={2} sm={2} md={2} lg={2} key={index}>
                        <DepartmentInquiryCount
                            departmentName={department.departmentName}
                            inquiryCount={department.inquiryCount || 0}
                            changeRate={department.changeRate}
                            previousCount={department.previousCount}
                            inquiryDifference={department.inquiryDifference}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DepartmentByMonth;
