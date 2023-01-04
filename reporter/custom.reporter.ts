import WDIOReporter from '@wdio/reporter';
const os = require('os');
const fs = require('fs');
import { readFileSync } from 'fs';
import { join } from 'path';

const jsonVar = new Map();
const testcases_array = new Array();
var totalPassSteps = 0;
var totalFailSteps = 0;
var totalPassTC = 0;
var totalFailTC = 0;

export default class CustomReporter extends WDIOReporter {

    constructor(options) {
        options = Object.assign(options, {})
        super(options);

    }

    // onSuiteStart(scenario)
    // {
    //     if(scenario.type === 'scenario')
    //     {
    //         console.log("scenfx",scenario.title)
    //     }
    // }

    // onRunnerEnd (runner) {
    //     // getCucumberData();
    //     let json = this.prepareJson(runner)
    //     this.write(JSON.stringify(json))
    // }

    // prepareJson (runner) {
    //     var resultSet = initResultSet(runner)

    //     for (let specId of Object.keys(runner.specs)) {
    //         resultSet.specs.push(runner.specs[specId])
    //         for (let suiteKey of Object.keys(this.suites)) {
    //             const suite = this.suites[suiteKey]
    //             let testSuite = {}
    //             testSuite.name = suite.title
    //             testSuite.duration = suite._duration
    //             testSuite.start = suite.start
    //             testSuite.end = suite.end
    //             testSuite.sessionId = runner.sessionId
    //             testSuite.tests = mapTests(suite.tests)
    //             testSuite.hooks = mapHooks(suite.hooks)

    //             resultSet.state.failed += testSuite.hooks.filter(hook => hook.error).length
    //             resultSet.state.passed += testSuite.tests.filter(test => test.state === 'passed').length
    //             resultSet.state.failed += testSuite.tests.filter(test => test.state === 'failed').length
    //             resultSet.state.skipped += testSuite.tests.filter(test => test.state === 'skipped').length
    //             resultSet.suites.push(testSuite)
    //         }
    //     }

    //     console.log("resultSet",resultSet);
    // }

    async onRunnerStart(runner) {
        var startTC_count = 0;
        jsonVar.set("report_product", "GEMJAR");
        jsonVar.set("suits_details", new Map());
        jsonVar.set("teststep_details", new Map());

        const testcase_info = new Map();
        const data = jsonVar.get("suits_details");

        testcase_info["total"] = startTC_count;
        data["testcase_info"] = testcase_info;
        data["framework_name"] = "GEMJAR";
        data["user"] = this.getUser();
        data["env"] = this.getEnv();
        data["project_name"] = this.getProjectName();
        data["report_name"] = this.getReportName();
        data["s_run_id"] = this.getProjectName() + "_" + this.getEnv().toUpperCase() + "_" + runner.sessionId;
        data["machine"] = this.getMachine();
    }


    // onSuiteStart(suite) {

    // }

    async onSuiteStart(suite) {
        totalPassSteps = 0;
        totalFailSteps = 0;
        const suiteData = jsonVar.get("suits_details")

        if (!suiteData["s_start_time"]) {
            suiteData["s_start_time"] = Date.now();
        }

        if (suite.type === "scenario") {
            suiteData["testcase_info"]["total"] = suiteData["testcase_info"]["total"] + 1;
            if (!suiteData["testcase_details"]) {

                //*for mapping the steps for each TC
                const tc_detail_obj = new Object();
                tc_detail_obj["tc_id"] = suite.uid;
                tc_detail_obj["tc_name"] = suite.title;
                testcases_array.push(tc_detail_obj);
                //*

                const arr = new Array();
                const testObj = new Object();
                testObj["name"] = suite.title;
                testObj["start_time"] = Date.now();
                testObj["tc_run_id"] = suite.title;
                testObj["machine"] = this.getMachine();
                testObj["run_mode"] = this.getRunMode();
                testObj["run_type"] = this.getRunType();

                arr.push(testObj)
                suiteData["testcase_details"] = arr;
            }
            else {

                //*for mapping the steps for each TC
                const tc_detail_obj = new Object();
                tc_detail_obj["tc_id"] = suite.uid;
                tc_detail_obj["tc_name"] = suite.title;
                testcases_array.push(tc_detail_obj);
                //*
                const arr = [...suiteData["testcase_details"]]
                const testObj = new Object();
                testObj["name"] = suite.title;
                testObj["start_time"] = Date.now();
                testObj["tc_run_id"] = suite.title;
                testObj["machine"] = this.getMachine();
                testObj["run_mode"] = this.getRunMode();
                testObj["run_type"] = this.getRunType();

                arr.push(testObj);

                suiteData["testcase_details"] = arr;
            }

            const data = jsonVar.get("teststep_details")
            data[suite.title] = new Object();
            data[suite.title]["steps"] = new Array();
            data[suite.title]["meta_data"] = new Array();


            //put meta_data
            const metaData = [...data[suite.title]["meta_data"]]
            const meta_obj_0 = new Object();
            const meta_obj_1 = new Object();
            const meta_obj_2 = new Object();

            meta_obj_0["TESTCASE NAME"] = suite.title;
            meta_obj_0["SERVICE PROJECT"] = "None";
            const meta_obj_0_date = new Object();
            meta_obj_0_date["value"] = Date.now();
            meta_obj_0_date["type"] = "date";
            meta_obj_0["DATE OF EXECUTION"] = meta_obj_0_date;
            metaData[0] = meta_obj_0;

            const meta_obj_1_startdate = new Object();
            meta_obj_1_startdate["value"] = Date.now();
            meta_obj_1_startdate["type"] = "datetime";
            meta_obj_1["EXECUTION STARTED ON"] = meta_obj_1_startdate
            metaData[1] = meta_obj_1;

            const meta_data_obj_2_stats = new Object();
            meta_data_obj_2_stats["TOTAL"] = 0;
            metaData[2] = meta_data_obj_2_stats;

            data[suite.title]["meta_data"] = metaData;
        }
    }

    async onTestStart(testStats) {
        const teststep_details = jsonVar.get("teststep_details");
        testcases_array.map((testcase) => {
            if (testcase["tc_id"] === testStats.parent) {
                const step_obj = new Object();
                step_obj["step name"] = testStats.title;


                //updating the total count of test step
                const meta_data_arr = [...teststep_details[testcase["tc_name"]]["meta_data"]]
                meta_data_arr[2]["TOTAL"] = meta_data_arr[2]["TOTAL"] + 1;
                teststep_details[testcase["tc_name"]]["meta_data"] = meta_data_arr;
                //


                const step_arr = [...teststep_details[testcase["tc_name"]]["steps"]]
                step_arr.push(step_obj);
                teststep_details[testcase["tc_name"]]["steps"] = step_arr;
            }
        })
    }

    async onTestPass(testStats) {
        const teststep_details = jsonVar.get("teststep_details");
        testcases_array.map((testcase) => {
            if (testcase["tc_id"] === testStats.parent) {
                const step_arr = [...teststep_details[testcase["tc_name"]]["steps"]]

                //putting in 1 index of meta_data //will put in the last tc end time of each suite
                const meta_data_arr = [...teststep_details[testcase["tc_name"]]["meta_data"]]
                const meta_data_endDate = new Object();
                meta_data_endDate["value"] = Date.now();
                meta_data_endDate["type"] = 'datetime'
                meta_data_arr[1]["EXECUTION ENDED ON"] = meta_data_endDate;
                if (!meta_data_arr[2]["PASS"]) {
                    meta_data_arr[2]["PASS"] = totalPassSteps + 1;
                }
                else {
                    meta_data_arr[2]["PASS"] = meta_data_arr[2]["PASS"] + 1;
                }
                teststep_details[testcase["tc_name"]]["meta_data"] = meta_data_arr;

                //*

                step_arr.map(step => {
                    if (step["step name"] === testStats.title) {
                        step["status"] = "PASS";
                    }
                })
                teststep_details[testcase["tc_name"]]["steps"] = step_arr;
            }
        })
    }

    async onTestFail(testStats) {
        const teststep_details = jsonVar.get("teststep_details");
        testcases_array.map((testcase) => {
            if (testcase["tc_id"] === testStats.parent) {
                const step_arr = [...teststep_details[testcase["tc_name"]]["steps"]]


                //putting in 1 index of meta_data
                const meta_data_arr = [...teststep_details[testcase["tc_name"]]["meta_data"]]
                const meta_data_endDate = new Object();
                meta_data_endDate["value"] = Date.now();
                meta_data_endDate["type"] = 'datetime'
                meta_data_arr[1]["EXECUTION ENDED ON"] = meta_data_endDate;
                if (!meta_data_arr[2]["FAIL"]) {
                    meta_data_arr[2]["FAIL"] = totalFailSteps + 1;
                }
                else {
                    meta_data_arr[2]["FAIL"] = meta_data_arr[2]["FAIL"] + 1;
                }
                teststep_details[testcase["tc_name"]]["meta_data"] = meta_data_arr;
                //*


                step_arr.map(step => {
                    if (step["step name"] === testStats.title) {
                        step["status"] = "FAIL";
                    }
                })
                teststep_details[testcase["tc_name"]]["steps"] = step_arr;
            }
        })
    }


    //     async onTestEnd(test)
    //     {
    //         const suiteData = jsonVar.get("suits_details")
    //         if (suite.type === "scenario") {
    //             const arr = [...suiteData["testcase_details"]]
    //             arr.map(value => {
    //                 if(value.name === suite.title)
    //                 {
    //                     value["end_time"] = Date.now();
    //                 }
    //             })
    //     }
    // }

    async onSuiteEnd(suite) {
        // console.log("suitedata",this.currentSuites)
        // const suited = this.suites;
        const suiteData = jsonVar.get("suits_details")

        if (suite.type === "scenario") {

            const arr = [...suiteData["testcase_details"]]
            arr.map(value => {
                if (value.name === suite.title) {
                    const status = this.getTestStatus(value.name)
                    value["end_time"] = Date.now();
                    value["status"] = status;
                }
            })

            // const testObj = new Object();
            // testObj["name"] = suite.title;
            // testObj["start_time"] = Date.now();

            // arr.push(testObj);
            // suiteData["testcase_details"] = arr;

        }
        suiteData["s_end_time"] = Date.now();
    }

    // onTestPass(test) {
    //     console.log(test.title + "..." + test.state)
    // }
    // onTestFail(test) {
    //     console.log(test.title + "..." + test.state)
    // }




    // async onTestPass(test) {
    //     if (!jsonVar.get("testDetails")) {
    //         const arr = new Array();
    //         const testObj = new Object();
    //         testObj["testTitle"] = test.title;
    //         testObj["testStatus"] = test.state;
    //         testObj["TC_end_time"]= Date.now();


    //         arr.push(testObj)
    //         // this.write(test.title + "\n");
    //         jsonVar.set("testDetails", arr)
    //     }
    //     else {
    //         const arr = [...jsonVar.get("testDetails")]
    //         const testObj = new Object();
    //         testObj["testTitle"] = test.title;
    //         testObj["testStatus"] = test.state;
    //         testObj["TC_end_time"]= Date.now();

    //         arr.push(testObj)
    //         jsonVar.set("testDetails", arr);
    //     }

    // }

    async onRunnerEnd() {

        const data = jsonVar.get("suits_details");

        const status = this.getSuiteStatus(data["testcase_details"]);
        if (status) {
            data["status"] = "PASS";
        }
        else {
            data["status"] = "FAIL";
        }

        // jsonVar["total"] = totalCases;
        console.log(jsonVar);

        this.createHtml();
        // var obj = Object.fromEntries(jsonVar);
        // var jsonString = JSON.stringify(obj);
        // this.write(jsonString);
    }



    getTestStatus(tc_name) {
        // const tc_arr = [...arr];
        const teststep_details = jsonVar.get("teststep_details");
        if (teststep_details[tc_name]) {
            // console.log("check17", " " , tc_name , teststep_details[tc_name]["meta_data"][2])
            if (teststep_details[tc_name]["meta_data"][2]["PASS"] && teststep_details[tc_name]["meta_data"][2]["TOTAL"] === teststep_details[tc_name]["meta_data"][2]["PASS"]) {
                return "PASS";
            }

            else if (teststep_details[tc_name]["meta_data"][2]["FAIL"]) {
                return "FAIL";
            }
        }
    }

    getSuiteStatus(dataTC) {
        var pass = true;
        const tc_info = jsonVar.get("suits_details");
        const data = [...dataTC]
        data.map(tc => {
            if (tc.status === "PASS") {
                console.log("check22", tc.name)
                if (!tc_info["testcase_info"]["PASS"]) {
                    tc_info["testcase_info"]["PASS"] = totalPassTC + 1;
                }
                else {
                    tc_info["testcase_info"]["PASS"] = tc_info["testcase_info"]["PASS"] + 1;
                }
            }
            else {
                pass = false;
                if (!tc_info["testcase_info"]["FAIL"]) {
                    tc_info["testcase_info"]["FAIL"] = totalFailTC + 1;
                }
                else {
                    tc_info["testcase_info"]["FAIL"] = tc_info["testcase_info"]["FAIL"] + 1;
                }
            }
        })
        return pass;
    }

    getMachine() {
        return os.hostname().toString();
    }
    getEnv() {
        return "beta";
    }

    getUser() {
        return os.userInfo().username;
    }

    getProjectName() {
        return "demo-project";
    }

    getReportName() {
        return "demo-Report";
    }

    getRunMode() {
        return 'windows';
    }

    getRunType() {
        return 'ON DEMAND'
    }

    createHtml() {
        var content = readFileSync(join(__dirname,'report.html'), 'utf8').toString();
        var obj = Object.fromEntries(jsonVar);
        var jsonString = JSON.stringify(obj);
        content = content.replace("var obj = '';", "var obj = " + jsonString + ";");
        this.write(content);
    }

}


