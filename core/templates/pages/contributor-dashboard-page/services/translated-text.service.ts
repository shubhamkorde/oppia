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
 * @fileoverview A service for getting the completed translations from backend
 * 
 */
  
  angular.module('oppia').factory('TranslatedTextService', [
    '$http', function($http) {
      var recievedTranslationsList = [];
      var recievedContentList = [];
      
      const getTranslationsList = function(){
        return recievedTranslationsList;
      }

      const getContentList = function(){
        return recievedContentList;
      }
  
      return {
        init: function(expId, languageCode, successCallback) {
          $http.get('/gettranslatedtexthandler', {
            params: {
              exp_id: expId,
              language_code: languageCode
            }
          }).then(function(response) {
            recievedTranslationsList = response.data.translations_list;
            recievedContentList = response.data.content_list;
            successCallback();
          });
        },
        getTranslatedText: function() {
          return {
            translationsList: getTranslationsList(),
            contentList: getContentList()
          };
        }
      };
    }]);
  