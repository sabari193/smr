////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

'use strict';

import Realm from 'realm';

class Cluster extends Realm.Object { }
Cluster.schema = {
    name: 'Cluster',
    primaryKey: 'clusterPrimaryID',
    properties: {
        clusterPrimaryID: 'string',
        clusterID: 'string',
        villageName: 'string',
        surveyType: 'string',
        status: { type: 'string', default: 'active' }
    }
};

class HouseholdSchema extends Realm.Object { }
HouseholdSchema.schema = {
    name: 'Household',
    primaryKey: 'id',
    properties: {
        id: 'string',
        HouseholdID: 'string',
        HouseholdStatus: 'string',
        HouseholdPrimary: 'int?',
        Name: 'string',
        KnowDOB: 'bool',
        DOB: 'string',
        AgeDays: 'string',
        Age: 'string',
        Sex: 'string',
        IsPersonAvailable: 'bool',
        Submitted: { type: 'string', default: 'active' },
        AgeMonths: 'int?',
        Category: 'string?',
        clusterID: 'string',
        UpdatedTime: 'string',
        HouseholdStatusValue: 'string',
        latitude: 'float?',
        longitude: 'float?',
        accuracy: 'float?'
    }
};

class HouseholdNumberSchema extends Realm.Object { }
HouseholdNumberSchema.schema = {
    name: 'HouseholdNumber',
    primaryKey: 'HouseholdPrimary',
    properties: {
        HouseholdPrimary: 'int',
        HouseholdID: { type: 'string' },
        HouseholdStatus: 'string',
        Submitted: { type: 'string', default: 'active' },
        clusterID: 'string'
    }
};

class RandomSurveySchema extends Realm.Object { }
RandomSurveySchema.schema = {
    name: 'RandomSurvey',
    primaryKey: 'clusterID',
    properties: {
        clusterID: { type: 'string' },
        surveyDetails: { type: 'string' }
    }
};

class SurveyDetailsSchema extends Realm.Object { }
SurveyDetailsSchema.schema = {
    name: 'SurveyDetails',
    primaryKey: 'surveyID',
    properties: {
        surveyID: { type: 'int' },
        Household: { type: 'string' },
        surveyData: { type: 'string' },
        type: 'string',
        status: 'string'
    }
};

class SurveyInformation extends Realm.Object { }
SurveyInformation.schema = {
    name: 'SurveyInformation',
    primaryKey: 'surveyID',
    properties: {
        surveyID: { type: 'int' },
        HouseholdID: { type: 'string' },
        AgeGroup: { type: 'string' },
        AgeDis: { type: 'string' },
        status: 'string',
        Name: 'string',
        Sex: 'string',
        surveyData: { type: 'string' },
        Sno: 'string',
        HoueholdHead: 'string',
        selectedIndividualCount: 'string'
    }
};

class BloodSampleSchema extends Realm.Object { }
BloodSampleSchema.schema = {
    name: 'BloodSample',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        clusterID: { type: 'string' },
        Submitted: { type: 'string', default: 'active' },
        TypeA: { type: 'int', default: 0 },
        TypeB: { type: 'int', default: 0 },
        TypeC: { type: 'int', default: 0 }
    }
};

export default new Realm({
    schema: [Cluster, HouseholdSchema, HouseholdNumberSchema,
        RandomSurveySchema, SurveyDetailsSchema,
        SurveyInformation, BloodSampleSchema]
});
