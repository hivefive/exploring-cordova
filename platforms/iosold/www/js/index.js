/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        var sendBtn = document.getElementById("send-log");
        sendBtn.addEventListener('click', function () {
            app.foxwayLog("Sent from cordova application!");
        }, false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    createAjax: function (method, url, data, successCallback, failureCallback, headers) {

        var xhttp = new XMLHttpRequest();

        xhttp.open(method, url, true);

        if (!!headers) {

            if (!!headers.ApiKey) {

                var authHeader = "Basic " + headers.ApiKey;

                xhttp.setRequestHeader("Authorization", authHeader);
            }

            xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        }

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState > 2) {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (!!xhttp.responseJSON) {
                        var response = xhttp.responseJSON;
                    } else {
                        var response = xhttp.responseText;
                    }
                    successCallback(response);
                } else {
                    failureCallback(xhttp.statusText);
                }
            }
        };

        if (!!data) {
            
            xhttp.send(data);

        } else {
            xhttp.send();
        }
    },
    foxwayLog: function (message) {
        app.createAjax("POST", "https://appcloud-test.foxway.com/logger?caller=christoffer", message, function () {
            console.log(message);
        }, function () {
            console.log("Failed to send log");
        });
    }
};

app.initialize();