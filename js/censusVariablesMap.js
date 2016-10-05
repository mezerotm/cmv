/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
<<<<<<< HEAD

=======
>>>>>>> mikebranch
class CensusVariablesMap {
    constructor() {
        this.CENSUS_VARS = [
            {value: "median_male_age", key: "B01002_002E"}, // median age male 
            {value: "median_female_age", key: "B01002_003E"}, // median age female
            {value: "population", key: "B01003_001E"}, // total population
            {value: "education_none", key: "B15003_002E"}, // No schooling completed
            {value: "education_high_school", key: "B15003_017E"}, // Regular high school diploma
            {value: "education_ged", key: "B15003_018E"}, // GED or alternative credential
            {value: "education_associates", key: "B15003_021E"}, // Associate's degree
            {value: "education_bachelors", key: "B15003_022E"}, // Bachelor's degree
            {value: "education_masters", key: "B15003_023E"}, // Master's degree
            {value: "education_professional", key: "B15003_024E"}, // Professional school degree
            {value: "poverty", key: "B17001_002E"}, // Income in the past 12 months below poverty level
            {value: "income", key: "B19013_001E"}, // Median household income in the past 12 months (in 2013 inflation-adjusted dollars)
            {value: "income_per_capita", key: "B19301_001E"}, // Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)
            {value: "employment_unemployed", key: "B23025_005E"}, // In labor force:!!Civilian labor force:!!Unemployed
            {value: "employment_not_labor_force", key: "B23025_007E"}, // Not in labor force
            {value: "commute_time", key: "B08136_001E"}, // Aggregate travel time to work (in minutes)
            {value: "commute_time_carpool", key: "B08136_004E"}, // Car, truck, or van: Carpooled
            {value: "commute_time_public_transport", key: "B08136_007E"}, // Public transportation (excluding taxicab)
            {value: "commute_time_solo_automobile", key: "B08136_003E"} // Car, truck, or van: Drove alone"
            ];
    }

    getVariableFromKey(keyValue) {
        for (var i = 0; i < this.CENSUS_VARS.length; i++) {
            if (this.CENSUS_VARS[i].key === keyValue)
                    return this.CENSUS_VARS[i].value;
        }
<<<<<<< HEAD

        return "Undefined";
    }


}
=======
        return "Undefined";
    }

    getVariableFromValue(value){
        for (var i = 0; i < this.CENSUS_VARS.length; i++) {
            if (this.CENSUS_VARS[i].value === value)
                return this.CENSUS_VARS[i].key;
        }
        return "Undefined";
    }
}


>>>>>>> mikebranch
