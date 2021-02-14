// Copyright 2021 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service to get learner answer info data and to delete
 * any learner answer info.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LearnerAnswerInfo } from 'domain/statistics/learner-answer-info.model';
import { ExplorationDataService } from './exploration-data.service';
import { UrlInterpolationService } from 'domain/utilities/url-interpolation.service';
import { InteractionCustomizationArgs } from
  'interactions/customization-args-defs';
export interface ILearnerAnswerDetails{
  'exp_Id': string;
  'state_name': string;
  'interaction_id': string;
  'customization_args': InteractionCustomizationArgs;
  'learner_answer_info_data': LearnerAnswerInfo[];
}
@Injectable({
  providedIn: 'root'
})

export class LearnerAnswerDetailsDataBackendApiService {
  constructor(
    private http: HttpClient,
    private urlInterpolationService: UrlInterpolationService,
    private explorationDataService: ExplorationDataService
  ) { }

  _expId = this.explorationDataService.explorationId;
  _data = [];
  learnerAnswerInfoData = null;
  LEARNER_ANSWER_INFO_DATA_URL = (
    '/learneranswerinfohandler/learner_answer_details/<entity_type>/' +
    '<entity_id>');

  _fetchLearnerAnswerInfoData()
  :Promise<HttpResponse<ILearnerAnswerDetails>> {
    let learnerAnswerInfoDataUrl = this.urlInterpolationService.interpolateUrl(
      this.LEARNER_ANSWER_INFO_DATA_URL, {
        entity_type: 'exploration',
        entity_id: this._expId
      });
    return this.http.get<ILearnerAnswerDetails>(learnerAnswerInfoDataUrl, {
      observe: 'response'
    }).toPromise();
  }

  _deleteLearnerAnswerInfo(
      entityId : string,
      stateName : string,
      learnerAnswerInfoId : string): Promise<HttpResponse<void>> {
    let learnerAnswerInfoDataUrl = this.urlInterpolationService.interpolateUrl(
      this.LEARNER_ANSWER_INFO_DATA_URL, {
        entity_type: 'exploration',
        entity_id: entityId
      });
    // eslint-disable-next-line dot-notation
    return this.http.delete<void>(learnerAnswerInfoDataUrl, {
      params: {
        state_name: stateName,
        learner_answer_info_id: learnerAnswerInfoId
      },
      observe: 'response'
    }).toPromise();
  }
}

angular.module('oppia').factory(
  'LearnerAnswerDetailsDataBackendApiService',
  downgradeInjectable(LearnerAnswerDetailsDataBackendApiService));
