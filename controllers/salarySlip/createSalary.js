const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);


const createSalarySlip = async (req, res) => {
    try {
        let {
            employee_id,
            basicPay,
            travelPay,
            bonus,
            paidLeave,
            tds,
            totalLeaves,
            advanceSalary,
        } = req.body;

        basicPay = Number(basicPay);
        travelPay = Number(travelPay);
        bonus = Number(bonus);
        totalLeaves = Number(totalLeaves);
        tds = Number(tds);
        advanceSalary = Number(advanceSalary);
        const additionPerLeave = (basicPay / 30) * paidLeave;

        const totalIncome = basicPay + travelPay + bonus + additionPerLeave;

        const deductionPerLeave = (basicPay / 30) * totalLeaves;
        const totalDeductions = deductionPerLeave + tds + advanceSalary;

        const netSalary = totalIncome - totalDeductions;
        const employee = await schemas.Employee.findOne({ employee_id: employee_id });
        const salary = new schemas.salarySlip({
            employee_id,
            basicPay,
            travelPay,
            bonus,
            paidLeave,
            tds,
            totalLeaves,
            advanceSalary,
            totalIncome,
            totalDeductions,
            netSalary,
        });

        await salary.save();
        salary
        const htmlContent = `
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link type="text/css" rel="stylesheet" href="resources/sheet.css">
        <style type="text/css">
            .ritz .waffle a {
                color: inherit;
            }
        
            .ritz .waffle .s4 {
                background-color: #ffffff;
                text-align: right;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 28pt;
                vertical-align: top;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s25 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s21 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #d9ead3;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s22 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #f4cccc;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s30 {
                border-bottom: 1px SOLID #2f5daa;
                border-right: 1px SOLID #ffffff;
                background-color: #ffffff;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s8 {
                background-color: #ffffff;
                text-align: right;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s18 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s28 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #cfe2f3;
                text-align: right;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s26 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s13 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #9fc5e8;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s16 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: top;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s5 {
                background-color: #ffffff;
                text-align: right;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 16pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s17 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: top;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s27 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s31 {
                border-bottom: 1px SOLID #2f5daa;
                border-right: 1px SOLID #2f5daa;
                background-color: #2f5daa;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s0 {
                border-right: 1px SOLID #2f5daa;
                background-color: #2f5daa;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s24 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: center;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s15 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s19 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #b6d7a8;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s29 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #cfe2f3;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s12 {
                border-bottom: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: top;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s1 {
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s3 {
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: top;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s10 {
                background-color: #ffffff;
                text-align: left;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s11 {
                border-bottom: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s23 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: center;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s2 {
                background-color: #ffffff;
                text-align: left;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 0;
            }
        
            .ritz .waffle .s7 {
                background-color: #ffffff;
                text-align: left;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s6 {
                background-color: #ffffff;
                text-align: right;
                color: #000000;
                font-family: 'Verdana';
                font-size: 10pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s14 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ffffff;
                text-align: left;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s9 {
                background-color: #ffffff;
                text-align: right;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: nowrap;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        
            .ritz .waffle .s20 {
                border-bottom: 1px SOLID #000000;
                border-right: 1px SOLID #000000;
                background-color: #ea9999;
                text-align: center;
                font-weight: bold;
                color: #000000;
                font-family: 'Verdana';
                font-size: 12pt;
                vertical-align: bottom;
                white-space: normal;
                overflow: hidden;
                word-wrap: break-word;
                direction: ltr;
                padding: 2px 3px 2px 3px;
            }
        </style>
        <div class="ritz grid-container" dir="ltr">
            <table class="waffle" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th class="row-header freezebar-origin-ltr"></th>
                        <th id="0C0" style="width:100px;" class="column-headers-background">A</th>
                        <th id="0C1" style="width:100px;" class="column-headers-background">B</th>
                        <th id="0C2" style="width:100px;" class="column-headers-background">C</th>
                        <th id="0C3" style="width:91px;" class="column-headers-background">D</th>
                        <th id="0C4" style="width:100px;" class="column-headers-background">E</th>
                        <th id="0C5" style="width:100px;" class="column-headers-background">F</th>
                        <th id="0C6" style="width:100px;" class="column-headers-background">G</th>
                        <th id="0C7" style="width:100px;" class="column-headers-background">H</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="height: 6px">
                        <th id="0R0" style="height: 6px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 6px">1</div>
                        </th>
                        <td class="s0" colspan="8"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R1" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">2</div>
                        </th>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                    </tr>
                    <tr style="height: 24px">
                        <th id="0R2" style="height: 24px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 24px">3</div>
                        </th>
                        <td class="s2" colspan="4" rowspan="3">
                            <div style="width:394px;height:73px;"><img
                                    src="https://lh7-us.googleusercontent.com/sheets/APBGjhaALd530r9LIHDmatBQ7S4x6Le7qREIFX9dSfbcRF_RcH1ERaVU27khTn5B6tGi4Cce2qM-OprqrhdANeL8CRxONDqgWfDGMiunUzKDevKOl1m2yyTwAcAM6NHxk_llouw04dbwP6R5YRCewf_D233oOB-3C3kKZQNwSr28T1L0bAvUN_lL-jCL9YE2IpDoVrlMYJ5i2_q9Qv57Rny4mePy1MWFSTTMXt7MH0R08QDrvEQ9c0C-RhJ0xT4uyHKA7Xu-HYQG8mAV6YjZTx6iKMFaOL1Nj2iYushh5c2l04ahgPMxfmenXhZpSItmj8pSM2U3NkAsvInHjSYDTFjqT32JRYAGtqFmCX6cpfw7SdWRSHYJSZQrp9qc-kihwXClTeZlHL5u4cg6IGL9CsGT3irMbpBmLbB6xqt7FqnL17h__4MtyX2Q71-Ciff9JyfPg_wsglupCEOSqNE_GP_7adM40GCkH3JL1n7tIquUNqmsmU0zPd_4cnKkbv--Xc9W-FwUMZwjSzVrCy5UFRCG0PPPkgWQoZtGOiRJB9LMrKrj83Svv_KY1V8Zj8yTdZQL0RyPMGHCaZ-Psu6h1h84JAKpZcf8nt0y87mgSCxhhjNz8J6HIh8hmVqiK95chyO5mxZXN8e8a7hlOQ3z1zkesM7d_C-3fZgRk0QSEF8mdzvhiaR5vnMSUgDW9qr0yge-qNGWy7o7JsJjYc8bjxtmZlECzYCCzv5ZitedhZ25NRsN097AQD-vGnpnZMzbAwSI_dqJEHgWTNc9RCva6OVqt6CauXRLdX1hL18Gz-Y0DPyf9bFEdLdwPvpxoxX2Xe1aU7R_WzsZoZmwfpQuU7l9lghFO1Cb5YP-XpKmW5uZtl8eWnqI_npQVXYso8LtVEYet0ip7-O_Be4vMMq1zgFavd-6N6USkSStXk7GAusGrp-MgmB2DF2-wmF6RUoGs9wyYvhIWwKw2I1ZbbmB5Eea4rwXBVmzjEaOPafgZQLHYJuvmrcNpkgznW9ABoiZkcnt5xJDb5vgcW5YkWfXGGa_9UFWGIzRGooJKlDkbXwO-XJ5qQ-ASxGg9DwpaTP_rdk91FiT7WwxwLisIBYT4wgxcserOpJZX2LmSSd4UtyRWtTxjZjhsOeWLAYnLWt7pwDgcDfX1QTtVzt00l04p1JrgifGKMUibCN6IFbFIL78XHRpdr1SUb2aM5welw3HO2CINVREJjzn7IWkWoBmKVW-gKXmruqhf5mkkUY=w394-h73"
                                    style="width:inherit;height:inherit;object-fit:scale-down;object-position:left bottom;" />
                            </div>
                        </td>
                        <td class="s3"></td>
                        <td class="s4" colspan="3" rowspan="2">Salary Slip</td>
                    </tr>
                    <tr style="height: 27px">
                        <th id="0R3" style="height: 27px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 27px">4</div>
                        </th>
                        <td class="s3"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R4" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">5</div>
                        </th>
                        <td class="s3"></td>
                        <td class="s5" dir="ltr" colspan="3">October 2023</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R5" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">6</div>
                        </th>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s1"></td>
                        <td class="s6"></td>
                        <td class="s6"></td>
                        <td class="s6"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R6" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">7</div>
                        </th>
                        <td class="s7" dir="ltr" colspan="4" rowspan="2">Address: <span style="font-weight:normal;">416, Laxmi
                                Tower, Commercial Complex, Azadpur, Delhi-110033</span></td>
                        <td class="s1"></td>
                        <td class="s8" colspan="3">${employee.name}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R7" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">8</div>
                        </th>
                        <td class="s1"></td>
                        <td class="s9" dir="ltr" colspan="3">Niharika Saxena</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R8" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">9</div>
                        </th>
                        <td class="s10" dir="ltr" colspan="4">Call us on: <span style="font-weight:normal;">(+91) 99990 97054 |
                                98993 85005</span></td>
                        <td class="s1"></td>
                        <td class="s9"></td>
                        <td class="s9"></td>
                        <td class="s9"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R9" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">10</div>
                        </th>
                        <td class="s10" dir="ltr" colspan="4">Write us at: <span
                                style="font-weight:normal;">hr@adsversify.com</span></td>
                        <td class="s1"></td>
                        <td class="s8" colspan="3">${employee.designation}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R10" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">11</div>
                        </th>
                        <td class="s10" dir="ltr" colspan="4">Visit us at: <span
                                style="font-weight:normal;">www.adsversify.com</span></td>
                        <td class="s1"></td>
                        <td class="s9" dir="ltr" colspan="3">Operations Head</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R11" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">12</div>
                        </th>
                        <td class="s11"></td>
                        <td class="s11"></td>
                        <td class="s11"></td>
                        <td class="s11"></td>
                        <td class="s12"></td>
                        <td class="s12"></td>
                        <td class="s12"></td>
                        <td class="s11"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R12" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">13</div>
                        </th>
                        <td class="s13" colspan="4">PARTICULARS</td>
                        <td class="s13" colspan="4">BANK DETAILS</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R13" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">14</div>
                        </th>
                        <td class="s14" colspan="2">PAN Number</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.panNumber}</td>
                        <td class="s14" dir="ltr" colspan="2">Name on Account</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.name}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R14" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">15</div>
                        </th>
                        <td class="s14" colspan="2">Aadhar Number</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.aadharNumber}</td>
                        <td class="s14" colspan="2">Bank Name</td>
                        <td class="s15" colspan="2">${employee.bankDetails.bankName}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R15" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">16</div>
                        </th>
                        <td class="s14" dir="ltr" colspan="2"></td>
                        <td class="s15" colspan="2"></td>
                        <td class="s14" colspan="2">Account Number</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.bankDetails.bankAccountNo}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R16" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">17</div>
                        </th>
                        <td class="s14" dir="ltr" colspan="2">Employee Type</td>
                        <td class="s15" dir="ltr" colspan="2">Full-Time</td>
                        <td class="s14" colspan="2">IFSC Code</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.bankDetails.bankIfscCode}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R17" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">18</div>
                        </th>
                        <td class="s14" dir="ltr" colspan="2">Department</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.department}</td>
                        <td class="s16" colspan="2" rowspan="2">Branch </td>
                        <td class="s17" dir="ltr" colspan="2" rowspan="2">${employee.bankDetails.branch}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R18" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">19</div>
                        </th>
                        <td class="s14" dir="ltr" colspan="2">Date of Joining</td>
                        <td class="s15" dir="ltr" colspan="2">${employee.joiningDate}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th id="0R19" style="height: 20px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 20px">20</div>
                        </th>
                        <td class="s14" dir="ltr" colspan="2">Date of Leaving</td>
                        <td class="s18" dir="ltr" colspan="2">Working</td>
                        <td class="s14" colspan="2"></td>
                        <td class="s15" colspan="2"></td>
                    </tr>
                    <tr style="height: 29px">
                        <th id="0R20" style="height: 29px;" class="row-headers-background">
                            <div class="row-header-wrapper" style="line-height: 29px">21</div>
                        </th>
                        <td class="s11" colspan="8"></td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s19" colspan="8">INCOMES</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s21" colspan="4">Particulars</td>
                        <td class="s21" colspan="4">Amount (₹)</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Basic</td>
                        <td class="s23" colspan="4">${basicPay}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Travel Allowance</td>
                        <td class="s23" colspan="4">${travelPay}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Bonus</td>
                        <td class="s23" colspan="4">${bonus}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Leaves</td>
                        <td class="s23" colspan="4">${paidLeave}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s25" colspan="4">Total Income</td>
                        <td class="s26" colspan="4">${totalIncome}</td>
                    </tr>
                    <!-- DEDUCTIONS Section -->
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s20" colspan="8">DEDUCTIONS</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s22" colspan="4">Particulars</td>
                        <td class="s22" colspan="4">Amount (₹)</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">TDS</td>
                        <td class="s23" colspan="4">${tds}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Leaves</td>
                        <td class="s23" colspan="4">${totalLeaves}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s15" colspan="4">Advance Salary</td>
                        <td class="s23" colspan="4">${advanceSalary}</td>
                    </tr>
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s25" colspan="4">Total Deductions</td>
                        <td class="s24" colspan="4">${totalDeductions}</td>
                    </tr>
                    <!-- Net Salary -->
                    <tr style="height: 20px">
                        <th style="height: 20px;" class="row-headers-background"></th>
                        <td class="s28" colspan="6">NET SALARY</td>
                        <td class="s29" colspan="2">${netSalary}</td>
                    </tr>
                    <tr style="height: 38px">
                        <th style="height: 38px;" class="row-headers-background"></th>
                        <td class="s30" colspan="8">Note: This is a Computer Generated Slip and does not require signature.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
        // Generate PDF from HTML content
        const pdfBuffer = await generatePdf(htmlContent);

        // Respond with the generated PDF
        res.set({
            "Content-Disposition": 'attachment; filename="salary_slip.pdf"',
            "Content-Type": "application/pdf",
        });
        res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
};

// Function to generate PDF from HTML content
function generatePdf(htmlContent) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports = createSalarySlip;