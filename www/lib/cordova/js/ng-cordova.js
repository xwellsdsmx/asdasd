/*!
 * ngCordova
 * v0.1.18-alpha
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
! function() {
    angular.module("ngCordova", ["ngCordova.plugins"]), angular.module("ngCordova.plugins.actionSheet", []).factory("$cordovaActionSheet", ["$q", "$window", function(e, n) {
            return {
                show: function(t) {
                    var r = e.defer();
                    return n.plugins.actionsheet.show(t, function(e) {
                        r.resolve(e)
                    }), r.promise
                },
                hide: function() {
                    return n.plugins.actionsheet.hide()
                }
            }
        }]), angular.module("ngCordova.plugins.adMob", []).factory("$cordovaAdMob", ["$q", "$window", function(e, n) {
            return {
                createBannerView: function(t) {
                    var r = e.defer();
                    return n.plugins.AdMob.createBannerView(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createInterstitialView: function(t) {
                    var r = e.defer();
                    return n.plugins.AdMob.createInterstitialView(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                requestAd: function(t) {
                    var r = e.defer();
                    return n.plugins.AdMob.requestAd(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showAd: function(t) {
                    var r = e.defer();
                    return n.plugins.AdMob.showAd(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                requestInterstitialAd: function(t) {
                    var r = e.defer();
                    return n.plugins.AdMob.requestInterstitialAd(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.appAvailability", []).factory("$cordovaAppAvailability", ["$q", function(e) {
            return {
                check: function(n) {
                    var t = e.defer();
                    return appAvailability.check(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.appRate", []).provider("$cordovaAppRate", [function() {
            this.setPreferences = function(e) {
                e && angular.isObject(e) && (AppRate.preferences.useLanguage = e.language || null, AppRate.preferences.displayAppName = e.appName || "", AppRate.preferences.promptAgainForEachNewVersion = e.promptForNewVersion || !0, AppRate.preferences.openStoreInApp = e.openStoreInApp || !1, AppRate.preferences.usesUntilPrompt = e.usesUntilPrompt || 3, AppRate.preferences.useCustomRateDialog = e.useCustomRateDialog || !1, AppRate.preferences.storeAppURL.ios = e.iosURL || null, AppRate.preferences.storeAppURL.android = e.androidURL || null, AppRate.preferences.storeAppURL.blackberry = e.blackberryURL || null, AppRate.preferences.storeAppURL.windows8 = e.windowsURL || null)
            }, this.setCustomLocale = function(e) {
                var n = {
                    title: "Rate %@",
                    message: "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
                    cancelButtonLabel: "No, Thanks",
                    laterButtonLabel: "Remind Me Later",
                    rateButtonLabel: "Rate It Now"
                };
                n = angular.extend(n, e), AppRate.preferences.customLocale = n
            }, this.$get = ["$q", function(e) {
                return {
                    promptForRating: function(n) {
                        var t = e.defer(),
                            r = AppRate.promptForRating(n);
                        return t.resolve(r), t.promise
                    },
                    navigateToAppStore: function() {
                        var n = e.defer(),
                            t = AppRate.navigateToAppStore();
                        return n.resolve(t), n.promise
                    },
                    onButtonClicked: function(e) {
                        AppRate.onButtonClicked = function(n) {
                            e.call(this, n)
                        }
                    },
                    onRateDialogShow: function(e) {
                        AppRate.onRateDialogShow = e()
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.appVersion", []).factory("$cordovaAppVersion", ["$q", function(e) {
            return {
                getVersionNumber: function() {
                    var n = e.defer();
                    return cordova.getAppVersion.getVersionNumber(function(e) {
                        n.resolve(e)
                    }), n.promise
                },
                getVersionCode: function() {
                    var n = e.defer();
                    return cordova.getAppVersion.getVersionCode(function(e) {
                        n.resolve(e)
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.backgroundGeolocation", []).factory("$cordovaBackgroundGeolocation", ["$q", "$window", function(e, n) {
            return {
                init: function() {
                    n.navigator.geolocation.getCurrentPosition(function(e) {
                        return e
                    })
                },
                configure: function(t) {
                    this.init();
                    var r = e.defer();
                    return n.plugins.backgroundGeoLocation.configure(function(e) {
                        r.notify(e), n.plugins.backgroundGeoLocation.finish()
                    }, function(e) {
                        r.reject(e)
                    }, t), this.start(), r.promise
                },
                start: function() {
                    var t = e.defer();
                    return n.plugins.backgroundGeoLocation.start(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                stop: function() {
                    var t = e.defer();
                    return n.plugins.backgroundGeoLocation.stop(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.badge", []).factory("$cordovaBadge", ["$q", function(e) {
            return {
                hasPermission: function() {
                    var n = e.defer();
                    return cordova.plugins.notification.badge.hasPermission(function(e) {
                        e ? n.resolve(!0) : n.reject("You do not have permission")
                    }), n.promise
                },
                promptForPermission: function() {
                    return cordova.plugins.notification.badge.promptForPermission()
                },
                set: function(n, t, r) {
                    var o = e.defer();
                    return cordova.plugins.notification.badge.hasPermission(function(e) {
                        e ? o.resolve(cordova.plugins.notification.badge.set(n, t, r)) : o.reject("You do not have permission to set Badge")
                    }), o.promise
                },
                get: function() {
                    var n = e.defer();
                    return cordova.plugins.notification.badge.hasPermission(function(e) {
                        e ? cordova.plugins.notification.badge.get(function(e) {
                            n.resolve(e)
                        }) : n.reject("You do not have permission to get Badge")
                    }), n.promise
                },
                clear: function(n, t) {
                    var r = e.defer();
                    return cordova.plugins.notification.badge.hasPermission(function(e) {
                        e ? r.resolve(cordova.plugins.notification.badge.clear(n, t)) : r.reject("You do not have permission to clear Badge")
                    }), r.promise
                },
                increase: function(n, t, r) {
                    var o = e.defer();
                    return this.hasPermission().then(function() {
                        o.resolve(cordova.plugins.notification.badge.increase(n, t, r))
                    }, function() {
                        o.reject("You do not have permission to increase Badge")
                    }), o.promise
                },
                decrease: function(n, t, r) {
                    var o = e.defer();
                    return this.hasPermission().then(function() {
                        o.resolve(cordova.plugins.notification.badge.decrease(n, t, r))
                    }, function() {
                        o.reject("You do not have permission to decrease Badge")
                    }), o.promise
                },
                configure: function(e) {
                    return cordova.plugins.notification.badge.configure(e)
                }
            }
        }]), angular.module("ngCordova.plugins.barcodeScanner", []).factory("$cordovaBarcodeScanner", ["$q", function(e) {
            return {
                scan: function(n) {
                    var t = e.defer();
                    return cordova.plugins.barcodeScanner.scan(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                encode: function(n, t) {
                    var r = e.defer();
                    return n = n || "TEXT_TYPE", cordova.plugins.barcodeScanner.encode(n, t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.batteryStatus", []).factory("$cordovaBatteryStatus", ["$rootScope", "$window", "$timeout", function(e, n, t) {
            var r = function(n) {
                    t(function() {
                        e.$broadcast("$cordovaBatteryStatus:status", n)
                    })
                },
                o = function(n) {
                    t(function() {
                        e.$broadcast("$cordovaBatteryStatus:critical", n)
                    })
                },
                i = function(n) {
                    t(function() {
                        e.$broadcast("$cordovaBatteryStatus:low", n)
                    })
                };
            return document.addEventListener("deviceready", function() {
                navigator.battery && (n.addEventListener("batterystatus", r, !1), n.addEventListener("batterycritical", o, !1), n.addEventListener("batterylow", i, !1))
            }, !1), !0
        }]).run(["$cordovaBatteryStatus", function(e) {}]), angular.module("ngCordova.plugins.ble", []).factory("$cordovaBLE", ["$q", "$timeout", function(e, n) {
            return {
                scan: function(t, r) {
                    var o = e.defer();
                    return ble.startScan(t, function(e) {
                        o.notify(e)
                    }, function(e) {
                        o.reject(e)
                    }), n(function() {
                        ble.stopScan(function() {
                            o.resolve()
                        }, function(e) {
                            o.reject(e)
                        })
                    }, 1e3 * r), o.promise
                },
                connect: function(n) {
                    var t = e.defer();
                    return ble.connect(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                disconnect: function(n) {
                    var t = e.defer();
                    return ble.disconnect(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                read: function(n, t, r) {
                    var o = e.defer();
                    return ble.read(n, t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                write: function(n, t, r, o) {
                    var i = e.defer();
                    return ble.write(n, t, r, o, function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.reject(e)
                    }), i.promise
                },
                writeCommand: function(n, t, r, o) {
                    var i = e.defer();
                    return ble.writeCommand(n, t, r, o, function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.reject(e)
                    }), i.promise
                },
                startNotification: function(n, t, r) {
                    var o = e.defer();
                    return ble.startNotification(n, t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                stopNotification: function(n, t, r) {
                    var o = e.defer();
                    return ble.stopNotification(n, t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                isConnected: function(n) {
                    var t = e.defer();
                    return ble.isConnected(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                isEnabled: function() {
                    var n = e.defer();
                    return ble.isEnabled(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.bluetoothSerial", []).factory("$cordovaBluetoothSerial", ["$q", "$window", function(e, n) {
            return {
                connect: function(t) {
                    var r = e.defer(),
                        o = e.defer(),
                        i = !1;
                    return n.bluetoothSerial.connect(t, function() {
                        i = !0, r.resolve(o)
                    }, function(e) {
                        i === !1 && o.reject(e), r.reject(e)
                    }), r.promise
                },
                connectInsecure: function(t) {
                    var r = e.defer();
                    return n.bluetoothSerial.connectInsecure(t, function() {
                        r.resolve()
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                disconnect: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.disconnect(function() {
                        t.resolve()
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                list: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.list(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                discoverUnpaired: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.discoverUnpaired(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                setDeviceDiscoveredListener: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.setDeviceDiscoveredListener(function(e) {
                        t.notify(e)
                    }), t.promise
                },
                clearDeviceDiscoveredListener: function() {
                    n.bluetoothSerial.clearDeviceDiscoveredListener()
                },
                showBluetoothSettings: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.showBluetoothSettings(function() {
                        t.resolve()
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                isEnabled: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.isEnabled(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                enable: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.enable(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                isConnected: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.isConnected(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                available: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.available(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                read: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.read(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                readUntil: function(t) {
                    var r = e.defer();
                    return n.bluetoothSerial.readUntil(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                write: function(t) {
                    var r = e.defer();
                    return n.bluetoothSerial.write(t, function() {
                        r.resolve()
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                subscribe: function(t) {
                    var r = e.defer();
                    return n.bluetoothSerial.subscribe(t, function(e) {
                        r.notify(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                subscribeRawData: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.subscribeRawData(function(e) {
                        t.notify(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                unsubscribe: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.unsubscribe(function() {
                        t.resolve()
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                unsubscribeRawData: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.unsubscribeRawData(function() {
                        t.resolve()
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                clear: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.clear(function() {
                        t.resolve()
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                readRSSI: function() {
                    var t = e.defer();
                    return n.bluetoothSerial.readRSSI(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.brightness", []).factory("$cordovaBrightness", ["$q", "$window", function(e, n) {
            return {
                get: function() {
                    var t = e.defer();
                    return n.cordova ? n.cordova.plugins.brightness.getBrightness(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }) : t.reject("Not supported without cordova.js"), t.promise
                },
                set: function(t) {
                    var r = e.defer();
                    return n.cordova ? n.cordova.plugins.brightness.setBrightness(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }) : r.reject("Not supported without cordova.js"), r.promise
                },
                setKeepScreenOn: function(t) {
                    var r = e.defer();
                    return n.cordova ? n.cordova.plugins.brightness.setKeepScreenOn(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }) : r.reject("Not supported without cordova.js"), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.calendar", []).factory("$cordovaCalendar", ["$q", "$window", function(e, n) {
            return {
                createCalendar: function(t) {
                    var r = e.defer(),
                        o = n.plugins.calendar.getCreateCalendarOptions();
                    return "string" == typeof t ? o.calendarName = t : o = angular.extend(o, t), n.plugins.calendar.createCalendar(o, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                deleteCalendar: function(t) {
                    var r = e.defer();
                    return n.plugins.calendar.deleteCalendar(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                createEvent: function(t) {
                    var r = e.defer(),
                        o = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.createEvent(o.title, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                createEventWithOptions: function(t) {
                    var r = e.defer(),
                        o = [],
                        i = window.plugins.calendar.getCalendarOptions(),
                        a = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null
                        };
                    o = Object.keys(a);
                    for (var c in t) - 1 === o.indexOf(c) ? i[c] = t[c] : a[c] = t[c];
                    return n.plugins.calendar.createEventWithOptions(a.title, a.location, a.notes, new Date(a.startDate), new Date(a.endDate), i, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                createEventInteractively: function(t) {
                    var r = e.defer(),
                        o = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.createEventInteractively(o.title, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                createEventInNamedCalendar: function(t) {
                    var r = e.defer(),
                        o = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null,
                            calendarName: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.createEventInNamedCalendar(o.title, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), o.calendarName, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                findEvent: function(t) {
                    var r = e.defer(),
                        o = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.findEvent(o.title, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                listEventsInRange: function(t, r) {
                    var o = e.defer();
                    return n.plugins.calendar.listEventsInRange(t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                listCalendars: function() {
                    var t = e.defer();
                    return n.plugins.calendar.listCalendars(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                findAllEventsInNamedCalendar: function(t) {
                    var r = e.defer();
                    return n.plugins.calendar.findAllEventsInNamedCalendar(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                modifyEvent: function(t) {
                    var r = e.defer(),
                        o = {
                            title: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null,
                            newTitle: null,
                            newLocation: null,
                            newNotes: null,
                            newStartDate: null,
                            newEndDate: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.modifyEvent(o.title, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), o.newTitle, o.newLocation, o.newNotes, new Date(o.newStartDate), new Date(o.newEndDate), function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                deleteEvent: function(t) {
                    var r = e.defer(),
                        o = {
                            newTitle: null,
                            location: null,
                            notes: null,
                            startDate: null,
                            endDate: null
                        };
                    return o = angular.extend(o, t), n.plugins.calendar.deleteEvent(o.newTitle, o.location, o.notes, new Date(o.startDate), new Date(o.endDate), function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.camera", []).factory("$cordovaCamera", ["$q", function(e) {
            return {
                getPicture: function(n) {
                    var t = e.defer();
                    return navigator.camera ? (navigator.camera.getPicture(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise) : (t.resolve(null), t.promise)
                },
                cleanup: function() {
                    var n = e.defer();
                    return navigator.camera.cleanup(function() {
                        n.resolve()
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.capture", []).factory("$cordovaCapture", ["$q", function(e) {
            return {
                captureAudio: function(n) {
                    var t = e.defer();
                    return navigator.device.capture ? (navigator.device.capture.captureAudio(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise) : (t.resolve(null), t.promise)
                },
                captureImage: function(n) {
                    var t = e.defer();
                    return navigator.device.capture ? (navigator.device.capture.captureImage(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise) : (t.resolve(null), t.promise)
                },
                captureVideo: function(n) {
                    var t = e.defer();
                    return navigator.device.capture ? (navigator.device.capture.captureVideo(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise) : (t.resolve(null), t.promise)
                }
            }
        }]), angular.module("ngCordova.plugins.cardIO", []).provider("$cordovaNgCardIO", [function() {
            var e = ["card_type", "redacted_card_number", "card_number", "expiry_month", "expiry_year", "short_expiry_year", "cvv", "zip"],
                n = {
                    expiry: !0,
                    cvv: !0,
                    zip: !1,
                    suppressManual: !1,
                    suppressConfirm: !1,
                    hideLogo: !0
                };
            this.setCardIOResponseFields = function(n) {
                n && angular.isArray(n) && (e = n)
            }, this.setScanerConfig = function(e) {
                e && angular.isObject(e) && (n.expiry = e.expiry || !0, n.cvv = e.cvv || !0, n.zip = e.zip || !1, n.suppressManual = e.suppressManual || !1, n.suppressConfirm = e.suppressConfirm || !1, n.hideLogo = e.hideLogo || !0)
            }, this.$get = ["$q", function(t) {
                return {
                    scanCard: function() {
                        var r = t.defer();
                        return CardIO.scan(n, function(n) {
                            if (null == n) r.reject(null);
                            else {
                                for (var t = {}, o = 0, i = e.length; i > o; o++) {
                                    var a = e[o];
                                    "short_expiry_year" == a ? t[a] = String(n.expiry_year).substr(2, 2) || "" : t[a] = n[a] || ""
                                }
                                r.resolve(t)
                            }
                        }, function() {
                            r.reject(null)
                        }), r.promise
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.clipboard", []).factory("$cordovaClipboard", ["$q", "$window", function(e, n) {
            return {
                copy: function(t) {
                    var r = e.defer();
                    return n.cordova.plugins.clipboard.copy(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                paste: function() {
                    var t = e.defer();
                    return n.cordova.plugins.clipboard.paste(function(e) {
                        t.resolve(e)
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.contacts", []).factory("$cordovaContacts", ["$q", function(e) {
            return {
                save: function(n) {
                    var t = e.defer(),
                        r = navigator.contacts.create(n);
                    return r.save(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                remove: function(n) {
                    var t = e.defer(),
                        r = navigator.contacts.create(n);
                    return r.remove(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                clone: function(e) {
                    var n = navigator.contacts.create(e);
                    return n.clone(e)
                },
                find: function(n) {
                    var t = e.defer(),
                        r = n.fields || ["id", "displayName"];
                    return delete n.fields, 0 === Object.keys(n).length ? navigator.contacts.find(r, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }) : navigator.contacts.find(r, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                pickContact: function() {
                    var n = e.defer();
                    return navigator.contacts.pickContact(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.datePicker", []).factory("$cordovaDatePicker", ["$window", "$q", function(e, n) {
            return {
                show: function(t) {
                    var r = n.defer();
                    return t = t || {
                        date: new Date,
                        mode: "date"
                    }, e.datePicker.show(t, function(e) {
                        r.resolve(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.device", []).factory("$cordovaDevice", [function() {
            return {
                getDevice: function() {
                    return device
                },
                getCordova: function() {
                    return device.cordova
                },
                getModel: function() {
                    return device.model
                },
                getName: function() {
                    return device.name
                },
                getPlatform: function() {
                    return device.platform
                },
                getUUID: function() {
                    return device.uuid
                },
                getVersion: function() {
                    return device.version
                },
                getManufacturer: function() {
                    return device.manufacturer
                }
            }
        }]), angular.module("ngCordova.plugins.deviceMotion", []).factory("$cordovaDeviceMotion", ["$q", function(e) {
            return {
                getCurrentAcceleration: function() {
                    var n = e.defer();
                    return (angular.isUndefined(navigato.accelerometer) || !angular.isFunction(navigator.accelerometer.getCurrentAcceleration)) && n.reject("Device do not support watchAcceleration"), navigator.accelerometer.getCurrentAcceleration(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                },
                watchAcceleration: function(n) {
                    var t = e.defer();
                    (angular.isUndefined(navigato.accelerometer) || !angular.isFunction(navigator.accelerometer.watchAcceleration)) && t.reject("Device do not support watchAcceleration");
                    var r = navigator.accelerometer.watchAcceleration(function(e) {
                        t.notify(e)
                    }, function(e) {
                        t.reject(e)
                    }, n);
                    return t.promise.cancel = function() {
                        navigator.accelerometer.clearWatch(r)
                    }, t.promise.clearWatch = function(e) {
                        navigator.accelerometer.clearWatch(e || r)
                    }, t.promise.watchID = r, t.promise
                },
                clearWatch: function(e) {
                    return navigator.accelerometer.clearWatch(e)
                }
            }
        }]), angular.module("ngCordova.plugins.deviceOrientation", []).factory("$cordovaDeviceOrientation", ["$q", function(e) {
            var n = {
                frequency: 3e3
            };
            return {
                getCurrentHeading: function() {
                    var n = e.defer();
                    return navigator.compass ? (navigator.compass.getCurrentHeading(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise) : (n.reject("No compass on Device"), n.promise)
                },
                watchHeading: function(t) {
                    var r = e.defer();
                    if (!navigator.compass) return r.reject("No compass on Device"), r.promise;
                    var o = angular.extend(n, t),
                        i = navigator.compass.watchHeading(function(e) {
                            r.notify(e)
                        }, function(e) {
                            r.reject(e)
                        }, o);
                    return r.promise.cancel = function() {
                        navigator.compass.clearWatch(i)
                    }, r.promise.clearWatch = function(e) {
                        navigator.compass.clearWatch(e || i)
                    }, r.promise.watchID = i, r.promise
                },
                clearWatch: function(e) {
                    return navigator.compass.clearWatch(e)
                }
            }
        }]), angular.module("ngCordova.plugins.dialogs", []).factory("$cordovaDialogs", ["$q", "$window", function(e, n) {
            return {
                alert: function(t, r, o) {
                    var i = e.defer();
                    return n.navigator.notification ? navigator.notification.alert(t, function() {
                        i.resolve()
                    }, r, o) : (n.alert(t), i.resolve()), i.promise
                },
                confirm: function(t, r, o) {
                    var i = e.defer();
                    return n.navigator.notification ? navigator.notification.confirm(t, function(e) {
                        i.resolve(e)
                    }, r, o) : n.confirm(t) ? i.resolve(1) : i.resolve(2), i.promise
                },
                prompt: function(t, r, o, i) {
                    var a = e.defer();
                    if (n.navigator.notification) navigator.notification.prompt(t, function(e) {
                        a.resolve(e)
                    }, r, o, i);
                    else {
                        var c = n.prompt(t, i);
                        null !== c ? a.resolve({
                            input1: c,
                            buttonIndex: 1
                        }) : a.resolve({
                            input1: c,
                            buttonIndex: 2
                        })
                    }
                    return a.promise
                },
                beep: function(e) {
                    return navigator.notification.beep(e)
                }
            }
        }]), angular.module("ngCordova.plugins.emailComposer", []).factory("$cordovaEmailComposer", ["$q", function(e) {
            return {
                isAvailable: function() {
                    var n = e.defer();
                    return cordova.plugins.email.isAvailable(function(e) {
                        e ? n.resolve() : n.reject()
                    }), n.promise
                },
                open: function(n) {
                    var t = e.defer();
                    return cordova.plugins.email.open(n, function() {
                        t.reject()
                    }), t.promise
                },
                addAlias: function(e, n) {
                    cordova.plugins.email.addAlias(e, n)
                }
            }
        }]), angular.module("ngCordova.plugins.facebook", []).provider("$cordovaFacebook", [function() {
            this.browserInit = function(e, n) {
                this.appID = e, this.appVersion = n || "v2.0", facebookConnectPlugin.browserInit(this.appID, this.appVersion)
            }, this.$get = ["$q", function(e) {
                return {
                    login: function(n) {
                        var t = e.defer();
                        return facebookConnectPlugin.login(n, function(e) {
                            t.resolve(e)
                        }, function(e) {
                            t.reject(e)
                        }), t.promise
                    },
                    showDialog: function(n) {
                        var t = e.defer();
                        return facebookConnectPlugin.showDialog(n, function(e) {
                            t.resolve(e)
                        }, function(e) {
                            t.reject(e)
                        }), t.promise
                    },
                    api: function(n, t) {
                        var r = e.defer();
                        return facebookConnectPlugin.api(n, t, function(e) {
                            r.resolve(e)
                        }, function(e) {
                            r.reject(e)
                        }), r.promise
                    },
                    getAccessToken: function() {
                        var n = e.defer();
                        return facebookConnectPlugin.getAccessToken(function(e) {
                            n.resolve(e)
                        }, function(e) {
                            n.reject(e)
                        }), n.promise
                    },
                    getLoginStatus: function() {
                        var n = e.defer();
                        return facebookConnectPlugin.getLoginStatus(function(e) {
                            n.resolve(e)
                        }, function(e) {
                            n.reject(e)
                        }), n.promise
                    },
                    logout: function() {
                        var n = e.defer();
                        return facebookConnectPlugin.logout(function(e) {
                            n.resolve(e)
                        }, function(e) {
                            n.reject(e)
                        }), n.promise
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.facebookAds", []).factory("$cordovaFacebookAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.FacebookAds.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.FacebookAds.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.FacebookAds.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.FacebookAds.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.FacebookAds.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.FacebookAds.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.FacebookAds.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.FacebookAds.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.file", []).constant("$cordovaFileError", {
            1: "NOT_FOUND_ERR",
            2: "SECURITY_ERR",
            3: "ABORT_ERR",
            4: "NOT_READABLE_ERR",
            5: "ENCODING_ERR",
            6: "NO_MODIFICATION_ALLOWED_ERR",
            7: "INVALID_STATE_ERR",
            8: "SYNTAX_ERR",
            9: "INVALID_MODIFICATION_ERR",
            10: "QUOTA_EXCEEDED_ERR",
            11: "TYPE_MISMATCH_ERR",
            12: "PATH_EXISTS_ERR"
        }).provider("$cordovaFile", [function() {
            this.$get = ["$q", "$window", "$cordovaFileError", function(e, n, t) {
                return {
                    getFreeDiskSpace: function() {
                        var n = e.defer();
                        return cordova.exec(function(e) {
                            n.resolve(e)
                        }, function(e) {
                            n.reject(e)
                        }, "File", "getFreeDiskSpace", []), n.promise
                    },
                    checkDir: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("directory cannot start with /");
                        try {
                            var a = r + o;
                            n.resolveLocalFileSystemURL(a, function(e) {
                                e.isDirectory === !0 ? i.resolve(e) : i.reject({
                                    code: 13,
                                    message: "input is not a directory"
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (c) {
                            c.message = t[c.code], i.reject(c)
                        }
                        return i.promise
                    },
                    checkFile: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("directory cannot start with /");
                        try {
                            var a = r + o;
                            n.resolveLocalFileSystemURL(a, function(e) {
                                e.isFile === !0 ? i.resolve(e) : i.reject({
                                    code: 13,
                                    message: "input is not a file"
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (c) {
                            c.message = t[c.code], i.reject(c)
                        }
                        return i.promise
                    },
                    createDir: function(r, o, i) {
                        var a = e.defer();
                        /^\//.test(o) && a.reject("directory cannot start with /"), i = i ? !1 : !0;
                        var c = {
                            create: !0,
                            exclusive: i
                        };
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getDirectory(o, c, function(e) {
                                    a.resolve(e)
                                }, function(e) {
                                    e.message = t[e.code], a.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], a.reject(e)
                            })
                        } catch (s) {
                            s.message = t[s.code], a.reject(s)
                        }
                        return a.promise
                    },
                    createFile: function(r, o, i) {
                        var a = e.defer();
                        /^\//.test(o) && a.reject("file-name cannot start with /"), i = i ? !1 : !0;
                        var c = {
                            create: !0,
                            exclusive: i
                        };
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, c, function(e) {
                                    a.resolve(e)
                                }, function(e) {
                                    e.message = t[e.code], a.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], a.reject(e)
                            })
                        } catch (s) {
                            s.message = t[s.code], a.reject(s)
                        }
                        return a.promise
                    },
                    removeDir: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getDirectory(o, {
                                    create: !1
                                }, function(e) {
                                    e.remove(function() {
                                        i.resolve({
                                            success: !0,
                                            fileRemoved: e
                                        })
                                    }, function(e) {
                                        e.message = t[e.code], i.reject(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    removeFile: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.remove(function() {
                                        i.resolve({
                                            success: !0,
                                            fileRemoved: e
                                        })
                                    }, function(e) {
                                        e.message = t[e.code], i.reject(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    removeRecursively: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getDirectory(o, {
                                    create: !1
                                }, function(e) {
                                    e.removeRecursively(function() {
                                        i.resolve({
                                            success: !0,
                                            fileRemoved: e
                                        })
                                    }, function(e) {
                                        e.message = t[e.code], i.reject(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    writeFile: function(r, o, i, a) {
                        var c = e.defer();
                        /^\//.test(o) && c.reject("file-name cannot start with /"), a = a ? !1 : !0;
                        var s = {
                            create: !0,
                            exclusive: a
                        };
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, s, function(e) {
                                    e.createWriter(function(e) {
                                        s.append === !0 && e.seek(e.length), s.truncate && e.truncate(s.truncate), e.onwriteend = function(e) {
                                            this.error ? c.reject(this.error) : c.resolve(e)
                                        }, e.write(i), c.promise.abort = function() {
                                            e.abort()
                                        }
                                    })
                                }, function(e) {
                                    e.message = t[e.code], c.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], c.reject(e)
                            })
                        } catch (u) {
                            u.message = t[u.code], c.reject(u)
                        }
                        return c.promise
                    },
                    writeExistingFile: function(r, o, i) {
                        var a = e.defer();
                        /^\//.test(o) && a.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.createWriter(function(e) {
                                        e.seek(e.length), e.onwriteend = function(e) {
                                            this.error ? a.reject(this.error) : a.resolve(e)
                                        }, e.write(i), a.promise.abort = function() {
                                            e.abort()
                                        }
                                    })
                                }, function(e) {
                                    e.message = t[e.code], a.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], a.reject(e)
                            })
                        } catch (c) {
                            c.message = t[c.code], a.reject(c)
                        }
                        return a.promise
                    },
                    readAsText: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.file(function(e) {
                                        var n = new FileReader;
                                        n.onloadend = function(e) {
                                            void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({
                                                code: null,
                                                message: "READER_ONLOADEND_ERR"
                                            })
                                        }, n.readAsText(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    readAsDataURL: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.file(function(e) {
                                        var n = new FileReader;
                                        n.onloadend = function(e) {
                                            void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({
                                                code: null,
                                                message: "READER_ONLOADEND_ERR"
                                            })
                                        }, n.readAsDataURL(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    readAsBinaryString: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.file(function(e) {
                                        var n = new FileReader;
                                        n.onloadend = function(e) {
                                            void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({
                                                code: null,
                                                message: "READER_ONLOADEND_ERR"
                                            })
                                        }, n.readAsBinaryString(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    readAsArrayBuffer: function(r, o) {
                        var i = e.defer();
                        /^\//.test(o) && i.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1
                                }, function(e) {
                                    e.file(function(e) {
                                        var n = new FileReader;
                                        n.onloadend = function(e) {
                                            void 0 !== e.target.result || null !== e.target.result ? i.resolve(e.target.result) : void 0 !== e.target.error || null !== e.target.error ? i.reject(e.target.error) : i.reject({
                                                code: null,
                                                message: "READER_ONLOADEND_ERR"
                                            })
                                        }, n.readAsArrayBuffer(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], i.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], i.reject(e)
                            })
                        } catch (a) {
                            a.message = t[a.code], i.reject(a)
                        }
                        return i.promise
                    },
                    moveFile: function(t, r, o, i) {
                        var a = e.defer();
                        i = i || r, (/^\//.test(r) || /^\//.test(i)) && a.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(t, function(e) {
                                e.getFile(r, {
                                    create: !1
                                }, function(e) {
                                    n.resolveLocalFileSystemURL(o, function(n) {
                                        e.moveTo(n, i, function(e) {
                                            a.resolve(e)
                                        }, function(e) {
                                            a.reject(e)
                                        })
                                    }, function(e) {
                                        a.reject(e)
                                    })
                                }, function(e) {
                                    a.reject(e)
                                })
                            }, function(e) {
                                a.reject(e);
                            })
                        } catch (c) {
                            a.reject(c)
                        }
                        return a.promise
                    },
                    moveDir: function(t, r, o, i) {
                        var a = e.defer();
                        i = i || r, (/^\//.test(r) || /^\//.test(i)) && a.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(t, function(e) {
                                e.getDirectory(r, {
                                    create: !1
                                }, function(e) {
                                    n.resolveLocalFileSystemURL(o, function(n) {
                                        e.moveTo(n, i, function(e) {
                                            a.resolve(e)
                                        }, function(e) {
                                            a.reject(e)
                                        })
                                    }, function(e) {
                                        a.reject(e)
                                    })
                                }, function(e) {
                                    a.reject(e)
                                })
                            }, function(e) {
                                a.reject(e)
                            })
                        } catch (c) {
                            a.reject(c)
                        }
                        return a.promise
                    },
                    copyDir: function(r, o, i, a) {
                        var c = e.defer();
                        a = a || o, (/^\//.test(o) || /^\//.test(a)) && c.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getDirectory(o, {
                                    create: !1,
                                    exclusive: !1
                                }, function(e) {
                                    n.resolveLocalFileSystemURL(i, function(n) {
                                        e.copyTo(n, a, function(e) {
                                            c.resolve(e)
                                        }, function(e) {
                                            e.message = t[e.code], c.reject(e)
                                        })
                                    }, function(e) {
                                        e.message = t[e.code], c.reject(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], c.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], c.reject(e)
                            })
                        } catch (s) {
                            s.message = t[s.code], c.reject(s)
                        }
                        return c.promise
                    },
                    copyFile: function(r, o, i, a) {
                        var c = e.defer();
                        a = a || o, /^\//.test(o) && c.reject("file-name cannot start with /");
                        try {
                            n.resolveLocalFileSystemURL(r, function(e) {
                                e.getFile(o, {
                                    create: !1,
                                    exclusive: !1
                                }, function(e) {
                                    n.resolveLocalFileSystemURL(i, function(n) {
                                        e.copyTo(n, a, function(e) {
                                            c.resolve(e)
                                        }, function(e) {
                                            e.message = t[e.code], c.reject(e)
                                        })
                                    }, function(e) {
                                        e.message = t[e.code], c.reject(e)
                                    })
                                }, function(e) {
                                    e.message = t[e.code], c.reject(e)
                                })
                            }, function(e) {
                                e.message = t[e.code], c.reject(e)
                            })
                        } catch (s) {
                            s.message = t[s.code], c.reject(s)
                        }
                        return c.promise
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.fileOpener2", []).factory("$cordovaFileOpener2", ["$q", function(e) {
            return {
                open: function(n, t) {
                    var r = e.defer();
                    return cordova.plugins.fileOpener2.open(n, t, {
                        error: function(e) {
                            r.reject(e)
                        },
                        success: function() {
                            r.resolve()
                        }
                    }), r.promise
                },
                uninstall: function(n) {
                    var t = e.defer();
                    return cordova.plugins.fileOpener2.uninstall(n, {
                        error: function(e) {
                            t.reject(e)
                        },
                        success: function() {
                            t.resolve()
                        }
                    }), t.promise
                },
                appIsInstalled: function(n) {
                    var t = e.defer();
                    return cordova.plugins.fileOpener2.appIsInstalled(n, {
                        success: function(e) {
                            t.resolve(e)
                        }
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.fileTransfer", []).factory("$cordovaFileTransfer", ["$q", "$timeout", function(e, n) {
            return {
                download: function(t, r, o, i) {
                    var a = e.defer(),
                        c = new FileTransfer,
                        s = o && o.encodeURI === !1 ? t : encodeURI(t);
                    return o && void 0 !== o.timeout && null !== o.timeout && (n(function() {
                        c.abort()
                    }, o.timeout), o.timeout = null), c.onprogress = function(e) {
                        a.notify(e)
                    }, a.promise.abort = function() {
                        c.abort()
                    }, c.download(s, r, a.resolve, a.reject, i, o), a.promise
                },
                upload: function(t, r, o, i) {
                    var a = e.defer(),
                        c = new FileTransfer,
                        s = o && o.encodeURI === !1 ? t : encodeURI(t);
                    return o && void 0 !== o.timeout && null !== o.timeout && (n(function() {
                        c.abort()
                    }, o.timeout), o.timeout = null), c.onprogress = function(e) {
                        a.notify(e)
                    }, a.promise.abort = function() {
                        c.abort()
                    }, c.upload(r, s, a.resolve, a.reject, o, i), a.promise
                }
            }
        }]), angular.module("ngCordova.plugins.flashlight", []).factory("$cordovaFlashlight", ["$q", "$window", function(e, n) {
            return {
                available: function() {
                    var t = e.defer();
                    return n.plugins.flashlight.available(function(e) {
                        t.resolve(e)
                    }), t.promise
                },
                switchOn: function() {
                    var t = e.defer();
                    return n.plugins.flashlight.switchOn(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                switchOff: function() {
                    var t = e.defer();
                    return n.plugins.flashlight.switchOff(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                toggle: function() {
                    var t = e.defer();
                    return n.plugins.flashlight.toggle(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.flurryAds", []).factory("$cordovaFlurryAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.FlurryAds.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.FlurryAds.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.FlurryAds.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.FlurryAds.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.FlurryAds.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.FlurryAds.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.FlurryAds.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.FlurryAds.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.ga", []).factory("$cordovaGA", ["$q", "$window", function(e, n) {
            return {
                init: function(t, r) {
                    var o = e.defer();
                    return r = r >= 0 ? r : 10, n.plugins.gaPlugin.init(function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }, t, r), o.promise
                },
                trackEvent: function(t, r, o, i, a, c) {
                    var s = e.defer();
                    return n.plugins.gaPlugin.trackEvent(function(e) {
                        s.resolve(e)
                    }, function(e) {
                        s.reject(e)
                    }, o, i, a, c), s.promise
                },
                trackPage: function(t, r, o) {
                    var i = e.defer();
                    return n.plugins.gaPlugin.trackPage(function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.reject(e)
                    }, o), i.promise
                },
                setVariable: function(t, r, o, i) {
                    var a = e.defer();
                    return n.plugins.gaPlugin.setVariable(function(e) {
                        a.resolve(e)
                    }, function(e) {
                        a.reject(e)
                    }, o, i), a.promise
                },
                exit: function(t, r) {
                    var o = e.defer();
                    return n.plugins.gaPlugin.exit(function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                }
            }
        }]), angular.module("ngCordova.plugins.geolocation", []).factory("$cordovaGeolocation", ["$q", function(e) {
            return {
                getCurrentPosition: function(n) {
                    var t = e.defer();
                    return navigator.geolocation.getCurrentPosition(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                watchPosition: function(n) {
                    var t = e.defer(),
                        r = navigator.geolocation.watchPosition(function(e) {
                            t.notify(e)
                        }, function(e) {
                            t.reject(e)
                        }, n);
                    return t.promise.cancel = function() {
                        navigator.geolocation.clearWatch(r)
                    }, t.promise.clearWatch = function(e) {
                        navigator.geolocation.clearWatch(e || r)
                    }, t.promise.watchID = r, t.promise
                },
                clearWatch: function(e) {
                    return navigator.geolocation.clearWatch(e)
                }
            }
        }]), angular.module("ngCordova.plugins.globalization", []).factory("$cordovaGlobalization", ["$q", function(e) {
            return {
                getPreferredLanguage: function() {
                    var n = e.defer();
                    return navigator.globalization.getPreferredLanguage(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                },
                getLocaleName: function() {
                    var n = e.defer();
                    return navigator.globalization.getLocaleName(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                },
                getFirstDayOfWeek: function() {
                    var n = e.defer();
                    return navigator.globalization.getFirstDayOfWeek(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }), n.promise
                },
                dateToString: function(n, t) {
                    var r = e.defer();
                    return navigator.globalization.dateToString(n, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                },
                stringToDate: function(n, t) {
                    var r = e.defer();
                    return navigator.globalization.stringToDate(n, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                },
                getDatePattern: function(n) {
                    var t = e.defer();
                    return navigator.globalization.getDatePattern(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                getDateNames: function(n) {
                    var t = e.defer();
                    return navigator.globalization.getDateNames(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                isDayLightSavingsTime: function(n) {
                    var t = e.defer();
                    return navigator.globalization.isDayLightSavingsTime(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                numberToString: function(n, t) {
                    var r = e.defer();
                    return navigator.globalization.numberToString(n, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                },
                stringToNumber: function(n, t) {
                    var r = e.defer();
                    return navigator.globalization.stringToNumber(n, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                },
                getNumberPattern: function(n) {
                    var t = e.defer();
                    return navigator.globalization.getNumberPattern(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n), t.promise
                },
                getCurrencyPattern: function(n) {
                    var t = e.defer();
                    return navigator.globalization.getCurrencyPattern(n, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.googleAds", []).factory("$cordovaGoogleAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.AdMob.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.AdMob.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.AdMob.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.AdMob.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.AdMob.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.AdMob.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.AdMob.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.AdMob.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.googleAnalytics", []).factory("$cordovaGoogleAnalytics", ["$q", "$window", function(e, n) {
            return {
                startTrackerWithId: function(t) {
                    var r = e.defer();
                    return n.analytics.startTrackerWithId(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                setUserId: function(t) {
                    var r = e.defer();
                    return n.analytics.setUserId(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                debugMode: function() {
                    var t = e.defer();
                    return n.analytics.debugMode(function(e) {
                        t.resolve(e)
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                trackView: function(t) {
                    var r = e.defer();
                    return n.analytics.trackView(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                addCustomDimension: function(t, r) {
                    var o = e.defer();
                    return n.analytics.addCustomDimension(t, r, function() {
                        o.resolve()
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                trackEvent: function(t, r, o, i) {
                    var a = e.defer();
                    return n.analytics.trackEvent(t, r, o, i, function(e) {
                        a.resolve(e)
                    }, function(e) {
                        a.reject(e)
                    }), a.promise
                },
                trackException: function(t, r) {
                    var o = e.defer();
                    return n.analytics.trackException(t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                trackTiming: function(t, r, o, i) {
                    var a = e.defer();
                    return n.analytics.trackTiming(t, r, o, i, function(e) {
                        a.resolve(e)
                    }, function(e) {
                        a.reject(e)
                    }), a.promise
                },
                addTransaction: function(t, r, o, i, a, c) {
                    var s = e.defer();
                    return n.analytics.addTransaction(t, r, o, i, a, c, function(e) {
                        s.resolve(e)
                    }, function(e) {
                        s.reject(e)
                    }), s.promise
                },
                addTransactionItem: function(t, r, o, i, a, c, s) {
                    var u = e.defer();
                    return n.analytics.addTransactionItem(t, r, o, i, a, c, s, function(e) {
                        u.resolve(e)
                    }, function(e) {
                        u.reject(e)
                    }), u.promise
                }
            }
        }]), angular.module("ngCordova.plugins.googleMap", []).factory("$cordovaGoogleMap", ["$q", "$window", function(e, n) {
            var t = null;
            return {
                getMap: function(r) {
                    var o = e.defer();
                    if (n.plugin.google.maps) {
                        var i = document.getElementById("map_canvas");
                        t = n.plugin.google.maps.Map.getMap(r), t.setDiv(i), o.resolve(t)
                    } else o.reject(null);
                    return o.promise
                },
                isMapLoaded: function() {
                    return !!t
                },
                addMarker: function(n) {
                    var r = e.defer();
                    return t.addMarker(n, function(e) {
                        r.resolve(e)
                    }), r.promise
                },
                getMapTypeIds: function() {
                    return n.plugin.google.maps.mapTypeId
                },
                setVisible: function(n) {
                    var r = e.defer();
                    return t.setVisible(n), r.promise
                },
                cleanup: function() {
                    t = null
                }
            }
        }]), angular.module("ngCordova.plugins.googlePlayGame", []).factory("$cordovaGooglePlayGame", ["$q", function(e) {
            return {
                auth: function() {
                    var n = e.defer();
                    return googleplaygame.auth(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                },
                signout: function() {
                    var n = e.defer();
                    return googleplaygame.signout(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                },
                isSignedIn: function() {
                    var n = e.defer();
                    return googleplaygame.isSignedIn(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                },
                showPlayer: function() {
                    var n = e.defer();
                    return googleplaygame.showPlayer(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                },
                submitScore: function(n) {
                    var t = e.defer();
                    return googleplaygame.submitScore(n, function(e) {
                        return t.resolve(e)
                    }, function(e) {
                        return t.reject(e)
                    }), t.promise
                },
                showAllLeaderboards: function() {
                    var n = e.defer();
                    return googleplaygame.showAllLeaderboards(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                },
                showLeaderboard: function(n) {
                    var t = e.defer();
                    return googleplaygame.showLeaderboard(n, function(e) {
                        return t.resolve(e)
                    }, function(e) {
                        return t.reject(e)
                    }), t.promise
                },
                unlockAchievement: function(n) {
                    var t = e.defer();
                    return googleplaygame.unlockAchievement(n, function(e) {
                        return t.resolve(e)
                    }, function(e) {
                        return t.reject(e)
                    }), t.promise
                },
                incrementAchievement: function(n) {
                    var t = e.defer();
                    return googleplaygame.incrementAchievement(n, function(e) {
                        return t.resolve(e)
                    }, function(e) {
                        return t.reject(e)
                    }), t.promise
                },
                showAchievements: function() {
                    var n = e.defer();
                    return googleplaygame.showAchievements(function(e) {
                        return n.resolve(e)
                    }, function(e) {
                        return n.reject(e)
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.googlePlus", []).factory("$cordovaGooglePlus", ["$q", "$window", function(e, n) {
            return {
                login: function(t) {
                    var r = e.defer();
                    return void 0 === t && (t = {}), n.plugins.googleplus.login({
                        iOSApiKey: t
                    }, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                silentLogin: function(t) {
                    var r = e.defer();
                    return void 0 === t && (t = {}), n.plugins.googleplus.trySilentLogin({
                        iOSApiKey: t
                    }, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                logout: function() {
                    var t = e.defer();
                    n.plugins.googleplus.logout(function(e) {
                        t.resolve(e)
                    })
                },
                disconnect: function() {
                    var t = e.defer();
                    n.plugins.googleplus.disconnect(function(e) {
                        t.resolve(e)
                    })
                },
                isAvailable: function() {
                    var t = e.defer();
                    return n.plugins.googleplus.isAvailable(function(e) {
                        e ? t.resolve(e) : t.reject(e)
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.healthKit", []).factory("$cordovaHealthKit", ["$q", "$window", function(e, n) {
            return {
                isAvailable: function() {
                    var t = e.defer();
                    return n.plugins.healthkit.available(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                checkAuthStatus: function(t) {
                    var r = e.defer();
                    return t = t || "HKQuantityTypeIdentifierHeight", n.plugins.healthkit.checkAuthStatus({
                        type: t
                    }, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                requestAuthorization: function(t, r) {
                    var o = e.defer();
                    return t = t || ["HKCharacteristicTypeIdentifierDateOfBirth", "HKQuantityTypeIdentifierActiveEnergyBurned", "HKQuantityTypeIdentifierHeight"], r = r || ["HKQuantityTypeIdentifierActiveEnergyBurned", "HKQuantityTypeIdentifierHeight", "HKQuantityTypeIdentifierDistanceCycling"], n.plugins.healthkit.requestAuthorization({
                        readTypes: t,
                        writeTypes: r
                    }, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                readDateOfBirth: function() {
                    var t = e.defer();
                    return n.plugins.healthkit.readDateOfBirth(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.resolve(e)
                    }), t.promise
                },
                readGender: function() {
                    var t = e.defer();
                    return n.plugins.healthkit.readGender(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.resolve(e)
                    }), t.promise
                },
                saveWeight: function(t, r, o) {
                    var i = e.defer();
                    return n.plugins.healthkit.saveWeight({
                        unit: r || "lb",
                        amount: t,
                        date: o || new Date
                    }, function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.resolve(e)
                    }), i.promise
                },
                readWeight: function(t) {
                    var r = e.defer();
                    return n.plugins.healthkit.readWeight({
                        unit: t || "lb"
                    }, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.resolve(e)
                    }), r.promise
                },
                saveHeight: function(t, r, o) {
                    var i = e.defer();
                    return n.plugins.healthkit.saveHeight({
                        unit: r || "in",
                        amount: t,
                        date: o || new Date
                    }, function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.resolve(e)
                    }), i.promise
                },
                readHeight: function(t) {
                    var r = e.defer();
                    return n.plugins.healthkit.readHeight({
                        unit: t || "in"
                    }, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.resolve(e)
                    }), r.promise
                },
                findWorkouts: function() {
                    var t = e.defer();
                    return n.plugins.healthkit.findWorkouts({}, function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.resolve(e)
                    }), t.promise
                },
                saveWorkout: function(t) {
                    var r = e.defer();
                    return n.plugins.healthkit.saveWorkout(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.resolve(e)
                    }), r.promise
                },
                querySampleType: function(t) {
                    var r = e.defer();
                    return n.plugins.healthkit.querySampleType(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.resolve(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.httpd", []).factory("$cordovaHttpd", ["$q", function(e) {
            return {
                startServer: function(n) {
                    var t = e.defer();
                    return cordova.plugins.CorHttpd.startServer(n, function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                stopServer: function() {
                    var n = e.defer();
                    return cordova.plugins.CorHttpd.stopServer(function() {
                        n.resolve()
                    }, function() {
                        n.reject()
                    }), n.promise
                },
                getURL: function() {
                    var n = e.defer();
                    return cordova.plugins.CorHttpd.getURL(function(e) {
                        n.resolve(e)
                    }, function() {
                        n.reject()
                    }), n.promise
                },
                getLocalPath: function() {
                    var n = e.defer();
                    return cordova.plugins.CorHttpd.getLocalPath(function(e) {
                        n.resolve(e)
                    }, function() {
                        n.reject()
                    }), n.promise
                }
            }
        }]), angular.module("ngCordova.plugins.iAd", []).factory("$cordovaiAd", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.iAd.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.iAd.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.iAd.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.iAd.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.iAd.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.iAd.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.iAd.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.iAd.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.imagePicker", []).factory("$cordovaImagePicker", ["$q", "$window", function(e, n) {
            return {
                getPictures: function(t) {
                    var r = e.defer();
                    return n.imagePicker.getPictures(function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.inAppBrowser", []).provider("$cordovaInAppBrowser", [function() {
            var e, n = this.defaultOptions = {};
            this.setDefaultOptions = function(e) {
                n = angular.extend(n, e)
            }, this.$get = ["$rootScope", "$q", "$window", "$timeout", function(t, r, o, i) {
                return {
                    open: function(a, c, s) {
                        var u = r.defer();
                        if (s && !angular.isObject(s)) return u.reject("options must be an object"), u.promise;
                        var l = angular.extend({}, n, s),
                            d = [];
                        angular.forEach(l, function(e, n) {
                            d.push(n + "=" + e)
                        });
                        var f = d.join();
                        return e = o.open(a, c, f), e.addEventListener("loadstart", function(e) {
                            i(function() {
                                t.$broadcast("$cordovaInAppBrowser:loadstart", e)
                            })
                        }, !1), e.addEventListener("loadstop", function(e) {
                            u.resolve(e), i(function() {
                                t.$broadcast("$cordovaInAppBrowser:loadstop", e)
                            })
                        }, !1), e.addEventListener("loaderror", function(e) {
                            u.reject(e), i(function() {
                                t.$broadcast("$cordovaInAppBrowser:loaderror", e)
                            })
                        }, !1), e.addEventListener("exit", function(e) {
                            i(function() {
                                t.$broadcast("$cordovaInAppBrowser:exit", e)
                            })
                        }, !1), u.promise
                    },
                    close: function() {
                        e.close(), e = null
                    },
                    show: function() {
                        e.show()
                    },
                    executeScript: function(n) {
                        var t = r.defer();
                        return e.executeScript(n, function(e) {
                            t.resolve(e)
                        }), t.promise
                    },
                    insertCSS: function(n) {
                        var t = r.defer();
                        return e.insertCSS(n, function(e) {
                            t.resolve(e)
                        }), t.promise
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.insomnia", []).factory("$cordovaInsomnia", ["$window", function(e) {
            return {
                keepAwake: function() {
                    return e.plugins.insomnia.keepAwake()
                },
                allowSleepAgain: function() {
                    return e.plugins.insomnia.allowSleepAgain()
                }
            }
        }]), angular.module("ngCordova.plugins.instagram", []).factory("$cordovaInstagram", ["$q", function(e) {
            return {
                share: function(n) {
                    var t = e.defer();
                    return window.Instagram ? (Instagram.share(n.image, n.caption, function(e) {
                        e ? t.reject(e) : t.resolve(!0)
                    }), t.promise) : (console.error("Tried to call Instagram.share but the Instagram plugin isn't installed!"), t.resolve(null), t.promise)
                },
                isInstalled: function() {
                    var n = e.defer();
                    return window.Instagram ? (Instagram.isInstalled(function(e, t) {
                        e ? n.reject(e) : n.resolve(t || !0)
                    }), n.promise) : (console.error("Tried to call Instagram.isInstalled but the Instagram plugin isn't installed!"), n.resolve(null), n.promise)
                }
            }
        }]), angular.module("ngCordova.plugins.keyboard", []).factory("$cordovaKeyboard", ["$rootScope", function(e) {
            var n = function() {
                    e.$evalAsync(function() {
                        e.$broadcast("$cordovaKeyboard:show")
                    })
                },
                t = function() {
                    e.$evalAsync(function() {
                        e.$broadcast("$cordovaKeyboard:hide")
                    })
                };
            return document.addEventListener("deviceready", function() {
                cordova.plugins.Keyboard && (window.addEventListener("native.keyboardshow", n, !1), window.addEventListener("native.keyboardhide", t, !1))
            }), {
                hideAccessoryBar: function(e) {
                    return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(e)
                },
                close: function() {
                    return cordova.plugins.Keyboard.close()
                },
                show: function() {
                    return cordova.plugins.Keyboard.show()
                },
                disableScroll: function(e) {
                    return cordova.plugins.Keyboard.disableScroll(e)
                },
                isVisible: function() {
                    return cordova.plugins.Keyboard.isVisible
                },
                clearShowWatch: function() {
                    document.removeEventListener("native.keyboardshow", n), e.$$listeners["$cordovaKeyboard:show"] = []
                },
                clearHideWatch: function() {
                    document.removeEventListener("native.keyboardhide", t), e.$$listeners["$cordovaKeyboard:hide"] = []
                }
            }
        }]), angular.module("ngCordova.plugins.keychain", []).factory("$cordovaKeychain", ["$q", function(e) {
            return {
                getForKey: function(n, t) {
                    var r = e.defer(),
                        o = new Keychain;
                    return o.getForKey(r.resolve, r.reject, n, t), r.promise
                },
                setForKey: function(n, t, r) {
                    var o = e.defer(),
                        i = new Keychain;
                    return i.setForKey(o.resolve, o.reject, n, t, r), o.promise
                },
                removeForKey: function(n, t) {
                    var r = e.defer(),
                        o = new Keychain;
                    return o.removeForKey(r.resolve, r.reject, n, t), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.launchNavigator", []).factory("$cordovaLaunchNavigator", ["$q", function(e) {
            return {
                navigate: function(n, t, r, o, i) {
                    var a = e.defer();
                    return launchnavigator.navigate(n, t, function() {
                        a.resolve()
                    }, function(e) {
                        a.reject(e)
                    }, i), a.promise
                }
            }
        }]), angular.module("ngCordova.plugins.localNotification", []).factory("$cordovaLocalNotification", ["$q", "$window", "$rootScope", "$timeout", function(e, n, t, r) {
            return document.addEventListener("deviceready", function() {
                n.cordova && n.cordova.plugins && n.cordova.plugins.notification && n.cordova.plugins.notification.local && (n.cordova.plugins.notification.local.on("schedule", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:schedule", e, n)
                    })
                }), n.cordova.plugins.notification.local.on("trigger", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:trigger", e, n)
                    })
                }), n.cordova.plugins.notification.local.on("update", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:update", e, n)
                    })
                }), n.cordova.plugins.notification.local.on("clear", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:clear", e, n)
                    })
                }), n.cordova.plugins.notification.local.on("clearall", function(e) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:clearall", e)
                    })
                }), n.cordova.plugins.notification.local.on("cancel", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:cancel", e, n)
                    })
                }), n.cordova.plugins.notification.local.on("cancelall", function(e) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:cancelall", e)
                    })
                }), n.cordova.plugins.notification.local.on("click", function(e, n) {
                    r(function() {
                        t.$broadcast("$cordovaLocalNotification:click", e, n)
                    })
                }))
            }, !1), {
                schedule: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.schedule(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                add: function(t, r) {
                    console.warn('Deprecated: use "schedule" instead.');
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.schedule(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                update: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.update(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                clear: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.clear(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                clearAll: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.clearAll(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                cancel: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.cancel(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                cancelAll: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.cancelAll(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                isPresent: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.isPresent(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                isScheduled: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.isScheduled(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                isTriggered: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.isTriggered(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                hasPermission: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.hasPermission(function(e) {
                        e ? r.resolve(e) : r.reject(e)
                    }, t), r.promise
                },
                registerPermission: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.registerPermission(function(e) {
                        e ? r.resolve(e) : r.reject(e)
                    }, t), r.promise
                },
                promptForPermission: function(t) {
                    console.warn('Deprecated: use "registerPermission" instead.');
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.registerPermission(function(e) {
                        e ? r.resolve(e) : r.reject(e)
                    }, t), r.promise
                },
                getAllIds: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getAllIds(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getIds: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getIds(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getScheduledIds: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getScheduledIds(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getTriggeredIds: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getTriggeredIds(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                get: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.get(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                getAll: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getAll(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getScheduled: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.getScheduled(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                getAllScheduled: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getAllScheduled(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getTriggered: function(t, r) {
                    var o = e.defer();
                    return r = r || null, n.cordova.plugins.notification.local.getTriggered(t, function(e) {
                        o.resolve(e)
                    }, r), o.promise
                },
                getAllTriggered: function(t) {
                    var r = e.defer();
                    return t = t || null, n.cordova.plugins.notification.local.getAllTriggered(function(e) {
                        r.resolve(e)
                    }, t), r.promise
                },
                getDefaults: function() {
                    return n.cordova.plugins.notification.local.getDefaults()
                },
                setDefaults: function(e) {
                    n.cordova.plugins.notification.local.setDefaults(e)
                }
            }
        }]), angular.module("ngCordova.plugins.mMediaAds", []).factory("$cordovaMMediaAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.mMedia.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.mMedia.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.mMedia.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.mMedia.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.mMedia.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.mMedia.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.mMedia.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.mMedia.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.media", []).service("NewMedia", ["$q", "$interval", function(e, n) {
            function t(e) {
                angular.isDefined(u) || (u = n(function() {
                    0 > f && (f = e.getDuration(), a && f > 0 && a.notify({
                        duration: f
                    })), e.getCurrentPosition(function(e) {
                        e > -1 && (d = e)
                    }, function(e) {
                        console.log("Error getting pos=" + e)
                    }), a && a.notify({
                        position: d
                    })
                }, 1e3))
            }

            function r() {
                angular.isDefined(u) && (n.cancel(u), u = void 0)
            }

            function o() {
                d = -1, f = -1
            }

            function i(e) {
                this.media = new Media(e, function(e) {
                    r(), o(), a.resolve(e)
                }, function(e) {
                    r(), o(), a.reject(e)
                }, function(e) {
                    l = e, a.notify({
                        status: l
                    })
                })
            }
            var a, c, s, u, l = null,
                d = -1,
                f = -1;
            return i.prototype.play = function(n) {
                return a = e.defer(), "object" != typeof n && (n = {}), this.media.play(n), t(this.media), a.promise
            }, i.prototype.pause = function() {
                r(), this.media.pause()
            }, i.prototype.stop = function() {
                this.media.stop()
            }, i.prototype.release = function() {
                this.media.release(), this.media = void 0
            }, i.prototype.seekTo = function(e) {
                this.media.seekTo(e)
            }, i.prototype.setVolume = function(e) {
                this.media.setVolume(e)
            }, i.prototype.startRecord = function() {
                this.media.startRecord()
            }, i.prototype.stopRecord = function() {
                this.media.stopRecord()
            }, i.prototype.currentTime = function() {
                return c = e.defer(), this.media.getCurrentPosition(function(e) {
                    c.resolve(e)
                }), c.promise
            }, i.prototype.getDuration = function() {
                return s = e.defer(), this.media.getDuration(function(e) {
                    s.resolve(e)
                }), s.promise
            }, i
        }]).factory("$cordovaMedia2", ["NewMedia", function(e) {
            return {
                newMedia: function(n) {
                    return new e(n)
                }
            }
        }]), angular.module("ngCordova.plugins.mobfoxAds", []).factory("$cordovaMobFoxAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.MobFox.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.MobFox.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.MobFox.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.MobFox.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.MobFox.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.MobFox.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.MobFox.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.MobFox.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins", ["ngCordova.plugins.actionSheet", "ngCordova.plugins.adMob", "ngCordova.plugins.appAvailability", "ngCordova.plugins.appRate", "ngCordova.plugins.appVersion", "ngCordova.plugins.backgroundGeolocation", "ngCordova.plugins.badge", "ngCordova.plugins.barcodeScanner", "ngCordova.plugins.batteryStatus", "ngCordova.plugins.ble", "ngCordova.plugins.bluetoothSerial", "ngCordova.plugins.brightness", "ngCordova.plugins.calendar", "ngCordova.plugins.camera", "ngCordova.plugins.capture", "ngCordova.plugins.clipboard", "ngCordova.plugins.contacts", "ngCordova.plugins.datePicker", "ngCordova.plugins.device", "ngCordova.plugins.deviceMotion", "ngCordova.plugins.deviceOrientation", "ngCordova.plugins.dialogs", "ngCordova.plugins.emailComposer", "ngCordova.plugins.facebook", "ngCordova.plugins.facebookAds", "ngCordova.plugins.file", "ngCordova.plugins.fileTransfer", "ngCordova.plugins.fileOpener2", "ngCordova.plugins.flashlight", "ngCordova.plugins.flurryAds", "ngCordova.plugins.ga", "ngCordova.plugins.geolocation", "ngCordova.plugins.globalization", "ngCordova.plugins.googleAds", "ngCordova.plugins.googleAnalytics", "ngCordova.plugins.googleMap", "ngCordova.plugins.googlePlayGame", "ngCordova.plugins.googlePlus", "ngCordova.plugins.healthKit", "ngCordova.plugins.httpd", "ngCordova.plugins.iAd", "ngCordova.plugins.imagePicker", "ngCordova.plugins.inAppBrowser", "ngCordova.plugins.instagram", "ngCordova.plugins.keyboard", "ngCordova.plugins.keychain", "ngCordova.plugins.launchNavigator", "ngCordova.plugins.localNotification", "ngCordova.plugins.media", "ngCordova.plugins.mMediaAds", "ngCordova.plugins.mobfoxAds", "ngCordova.plugins.mopubAds", "ngCordova.plugins.nativeAudio", "ngCordova.plugins.network", "ngCordovaOauth", "ngCordova.plugins.pinDialog", "ngCordova.plugins.prefs", "ngCordova.plugins.printer", "ngCordova.plugins.progressIndicator", "ngCordova.plugins.push", "ngCordova.plugins.sms", "ngCordova.plugins.socialSharing", "ngCordova.plugins.spinnerDialog", "ngCordova.plugins.splashscreen", "ngCordova.plugins.sqlite", "ngCordova.plugins.statusbar", "ngCordova.plugins.toast", "ngCordova.plugins.touchid", "ngCordova.plugins.vibration", "ngCordova.plugins.videoCapturePlus", "ngCordova.plugins.zip", "ngCordova.plugins.insomnia"]),
        angular.module("ngCordova.plugins.mopubAds", []).factory("$cordovaMoPubAds", ["$q", "$window", function(e, n) {
            return {
                setOptions: function(t) {
                    var r = e.defer();
                    return n.MoPub.setOptions(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                createBanner: function(t) {
                    var r = e.defer();
                    return n.MoPub.createBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                removeBanner: function() {
                    var t = e.defer();
                    return n.MoPub.removeBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                showBanner: function(t) {
                    var r = e.defer();
                    return n.MoPub.showBanner(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showBannerAtXY: function(t, r) {
                    var o = e.defer();
                    return n.MoPub.showBannerAtXY(t, r, function() {
                        o.resolve()
                    }, function() {
                        o.reject()
                    }), o.promise
                },
                hideBanner: function() {
                    var t = e.defer();
                    return n.MoPub.hideBanner(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                },
                prepareInterstitial: function(t) {
                    var r = e.defer();
                    return n.MoPub.prepareInterstitial(t, function() {
                        r.resolve()
                    }, function() {
                        r.reject()
                    }), r.promise
                },
                showInterstitial: function() {
                    var t = e.defer();
                    return n.MoPub.showInterstitial(function() {
                        t.resolve()
                    }, function() {
                        t.reject()
                    }), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.nativeAudio", []).factory("$cordovaNativeAudio", ["$q", "$window", function(e, n) {
            return {
                preloadSimple: function(t, r) {
                    var o = e.defer();
                    return n.plugins.NativeAudio.preloadSimple(t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                preloadComplex: function(t, r, o, i) {
                    var a = e.defer();
                    return n.plugins.NativeAudio.preloadComplex(t, r, o, i, function(e) {
                        a.resolve(e)
                    }, function(e) {
                        a.reject(e)
                    }), a.promise
                },
                play: function(t, r) {
                    var o = e.defer();
                    return n.plugins.NativeAudio.play(t, r, function(e) {
                        o.reject(e)
                    }, function(e) {
                        o.resolve(e)
                    }), o.promise
                },
                stop: function(t) {
                    var r = e.defer();
                    return n.plugins.NativeAudio.stop(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                loop: function(t) {
                    var r = e.defer();
                    return n.plugins.NativeAudio.loop(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                unload: function(t) {
                    var r = e.defer();
                    return n.plugins.NativeAudio.unload(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                setVolumeForComplexAsset: function(t, r) {
                    var o = e.defer();
                    return n.plugins.NativeAudio.setVolumeForComplexAsset(t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                }
            }
        }]), angular.module("ngCordova.plugins.network", []).factory("$cordovaNetwork", ["$rootScope", "$timeout", function(e, n) {
            var t = function() {
                    var t = navigator.connection.type;
                    n(function() {
                        e.$broadcast("$cordovaNetwork:offline", t)
                    })
                },
                r = function() {
                    var t = navigator.connection.type;
                    n(function() {
                        e.$broadcast("$cordovaNetwork:online", t)
                    })
                };
            return document.addEventListener("deviceready", function() {
                navigator.connection && (document.addEventListener("offline", t, !1), document.addEventListener("online", r, !1))
            }), {
                getNetwork: function() {
                    return navigator.connection.type
                },
                isOnline: function() {
                    var e = navigator.connection.type;
                    return e !== Connection.UNKNOWN && e !== Connection.NONE
                },
                isOffline: function() {
                    var e = navigator.connection.type;
                    return e === Connection.UNKNOWN || e === Connection.NONE
                },
                clearOfflineWatch: function() {
                    document.removeEventListener("offline", t), e.$$listeners["$cordovaNetwork:offline"] = []
                },
                clearOnlineWatch: function() {
                    document.removeEventListener("online", r), e.$$listeners["$cordovaNetwork:online"] = []
                }
            }
        }]).run(["$cordovaNetwork", function(e) {}]), angular.module("ngCordova.plugins.pinDialog", []).factory("$cordovaPinDialog", ["$q", "$window", function(e, n) {
            return {
                prompt: function(t, r, o) {
                    var i = e.defer();
                    return n.plugins.pinDialog.prompt(t, function(e) {
                        i.resolve(e)
                    }, r, o), i.promise
                }
            }
        }]), angular.module("ngCordova.plugins.prefs", []).factory("$cordovaPreferences", ["$window", "$q", function(e, n) {
            return {
                set: function(t, r) {
                    var o = n.defer();
                    return e.appgiraffe.plugins.applicationPreferences.set(t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                },
                get: function(t) {
                    var r = n.defer();
                    return e.appgiraffe.plugins.applicationPreferences.get(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.printer", []).factory("$cordovaPrinter", ["$q", "$window", function(e, n) {
            return {
                isAvailable: function() {
                    var t = e.defer();
                    return n.plugin.printer.isAvailable(function(e) {
                        t.resolve(e)
                    }), t.promise
                },
                print: function(t, r) {
                    var o = e.defer();
                    return n.plugin.printer.print(t, r, function() {
                        o.resolve()
                    }), o.promise
                }
            }
        }]), angular.module("ngCordova.plugins.progressIndicator", []).factory("$cordovaProgress", ["$q", function(e) {
            return {
                show: function(e) {
                    var n = e || "Please wait...";
                    return ProgressIndicator.show(n)
                },
                showSimple: function(e) {
                    var n = e || !1;
                    return ProgressIndicator.showSimple(n)
                },
                showSimpleWithLabel: function(e, n) {
                    var t = e || !1,
                        r = n || "Loading...";
                    return ProgressIndicator.showSimpleWithLabel(t, r)
                },
                showSimpleWithLabelDetail: function(e, n, t) {
                    var r = e || !1,
                        o = n || "Loading...",
                        i = t || "Please wait";
                    return ProgressIndicator.showSimpleWithLabelDetail(r, o, i)
                },
                showDeterminate: function(e, n) {
                    var t = e || !1,
                        r = n || 5e4;
                    return ProgressIndicator.showDeterminate(t, r)
                },
                showDeterminateWithLabel: function(e, n, t) {
                    var r = e || !1,
                        o = n || 5e4,
                        i = t || "Loading...";
                    return ProgressIndicator.showDeterminateWithLabel(r, o, i)
                },
                showAnnular: function(e, n) {
                    var t = e || !1,
                        r = n || 5e4;
                    return ProgressIndicator.showAnnular(t, r)
                },
                showAnnularWithLabel: function(e, n, t) {
                    var r = e || !1,
                        o = n || 5e4,
                        i = t || "Loading...";
                    return ProgressIndicator.showAnnularWithLabel(r, o, i)
                },
                showBar: function(e, n) {
                    var t = e || !1,
                        r = n || 5e4;
                    return ProgressIndicator.showBar(t, r)
                },
                showBarWithLabel: function(e, n, t) {
                    var r = e || !1,
                        o = n || 5e4,
                        i = t || "Loading...";
                    return ProgressIndicator.showBarWithLabel(r, o, i)
                },
                showSuccess: function(e, n) {
                    var t = e || !1,
                        r = n || "Success";
                    return ProgressIndicator.showSuccess(t, r)
                },
                showText: function(e, n, t) {
                    var r = e || !1,
                        o = n || "Warning",
                        i = t || "center";
                    return ProgressIndicator.showText(r, o, i)
                },
                hide: function() {
                    return ProgressIndicator.hide()
                }
            }
        }]), angular.module("ngCordova.plugins.push", []).factory("$cordovaPush", ["$q", "$window", "$rootScope", "$timeout", function(e, n, t, r) {
            return {
                onNotification: function(e) {
                    r(function() {
                        t.$broadcast("$cordovaPush:notificationReceived", e)
                    })
                },
                register: function(t) {
                    var r, o = e.defer();
                    return void 0 !== t && void 0 === t.ecb && (r = null === document.querySelector("[ng-app]") ? "document.body" : "document.querySelector('[ng-app]')", t.ecb = "angular.element(" + r + ").injector().get('$cordovaPush').onNotification"), n.plugins.pushNotification.register(function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }, t), o.promise
                },
                unregister: function(t) {
                    var r = e.defer();
                    return n.plugins.pushNotification.unregister(function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                },
                setBadgeNumber: function(t) {
                    var r = e.defer();
                    return n.plugins.pushNotification.setApplicationIconBadgeNumber(function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }, t), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.sms", []).factory("$cordovaSms", ["$q", function(e) {
            return {
                send: function(n, t, r) {
                    var o = e.defer();
                    return sms.send(n, t, r, function(e) {
                        o.resolve(e)
                    }, function(e) {
                        o.reject(e)
                    }), o.promise
                }
            }
        }]), angular.module("ngCordova.plugins.socialSharing", []).factory("$cordovaSocialSharing", ["$q", "$window", function(e, n) {
            return {
                share: function(t, r, o, i) {
                    var a = e.defer();
                    return r = r || null, o = o || null, i = i || null, n.plugins.socialsharing.share(t, r, o, i, function() {
                        a.resolve(!0)
                    }, function() {
                        a.reject(!1)
                    }), a.promise
                },
                shareViaTwitter: function(t, r, o) {
                    var i = e.defer();
                    return r = r || null, o = o || null, n.plugins.socialsharing.shareViaTwitter(t, r, o, function() {
                        i.resolve(!0)
                    }, function() {
                        i.reject(!1)
                    }), i.promise
                },
                shareViaWhatsApp: function(t, r, o) {
                    var i = e.defer();
                    return r = r || null, o = o || null, n.plugins.socialsharing.shareViaWhatsApp(t, r, o, function() {
                        i.resolve(!0)
                    }, function() {
                        i.reject(!1)
                    }), i.promise
                },
                shareViaFacebook: function(t, r, o) {
                    var i = e.defer();
                    return t = t || null, r = r || null, o = o || null, n.plugins.socialsharing.shareViaFacebook(t, r, o, function() {
                        i.resolve(!0)
                    }, function() {
                        i.reject(!1)
                    }), i.promise
                },
                shareViaFacebookWithPasteMessageHint: function(t, r, o, i) {
                    var a = e.defer();
                    return r = r || null, o = o || null, n.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(t, r, o, i, function() {
                        a.resolve(!0)
                    }, function() {
                        a.reject(!1)
                    }), a.promise
                },
                shareViaSMS: function(t, r) {
                    var o = e.defer();
                    return n.plugins.socialsharing.shareViaSMS(t, r, function() {
                        o.resolve(!0)
                    }, function() {
                        o.reject(!1)
                    }), o.promise
                },
                shareViaEmail: function(t, r, o, i, a, c) {
                    var s = e.defer();
                    return o = o || null, i = i || null, a = a || null, c = c || null, n.plugins.socialsharing.shareViaEmail(t, r, o, i, a, c, function() {
                        s.resolve(!0)
                    }, function() {
                        s.reject(!1)
                    }), s.promise
                },
                shareVia: function(t, r, o, i, a) {
                    var c = e.defer();
                    return r = r || null, o = o || null, i = i || null, a = a || null, n.plugins.socialsharing.shareVia(t, r, o, i, a, function() {
                        c.resolve(!0)
                    }, function() {
                        c.reject(!1)
                    }), c.promise
                },
                canShareViaEmail: function() {
                    var t = e.defer();
                    return n.plugins.socialsharing.canShareViaEmail(function() {
                        t.resolve(!0)
                    }, function() {
                        t.reject(!1)
                    }), t.promise
                },
                canShareVia: function(t, r, o, i, a) {
                    var c = e.defer();
                    return n.plugins.socialsharing.canShareVia(t, r, o, i, a, function(e) {
                        c.resolve(e)
                    }, function(e) {
                        c.reject(e)
                    }), c.promise
                },
                available: function() {
                    var n = e.defer();
                    window.plugins.socialsharing.available(function(e) {
                        e ? n.resolve() : n.reject()
                    })
                }
            }
        }]), angular.module("ngCordova.plugins.spinnerDialog", []).factory("$cordovaSpinnerDialog", ["$window", function(e) {
            return {
                show: function(n, t, r) {
                    return r = r || !1, e.plugins.spinnerDialog.show(n, t, r)
                },
                hide: function() {
                    return e.plugins.spinnerDialog.hide()
                }
            }
        }]), angular.module("ngCordova.plugins.splashscreen", []).factory("$cordovaSplashscreen", [function() {
            return {
                hide: function() {
                    return navigator.splashscreen.hide()
                },
                show: function() {
                    return navigator.splashscreen.show()
                }
            }
        }]), angular.module("ngCordova.plugins.sqlite", []).factory("$cordovaSQLite", ["$q", "$window", function(e, n) {
            return {
                openDB: function(e, t) {
                    return "object" != typeof e && (e = {
                        name: e
                    }), "undefined" != typeof t && (e.bgType = t), n.sqlitePlugin.openDatabase(e)
                },
                execute: function(n, t, r) {
                    var o = e.defer();
                    return n.transaction(function(e) {
                        e.executeSql(t, r, function(e, n) {
                            o.resolve(n)
                        }, function(e, n) {
                            o.reject(n)
                        })
                    }), o.promise
                },
                insertCollection: function(n, t, r) {
                    var o = e.defer(),
                        i = r.slice(0);
                    return n.transaction(function(e) {
                        ! function n() {
                            var r = i.splice(0, 1)[0];
                            try {
                                e.executeSql(t, r, function(e, t) {
                                    0 === i.length ? o.resolve(t) : n()
                                }, function(e, n) {
                                    o.reject(n)
                                })
                            } catch (a) {
                                o.reject(a)
                            }
                        }()
                    }), o.promise
                },
                nestedExecute: function(n, t, r, o, i) {
                    var a = e.defer();
                    return n.transaction(function(e) {
                        e.executeSql(t, o, function(e, n) {
                            a.resolve(n), e.executeSql(r, i, function(e, n) {
                                a.resolve(n)
                            })
                        })
                    }, function(e, n) {
                        a.reject(n)
                    }), a.promise
                },
                deleteDB: function(t) {
                    var r = e.defer();
                    return n.sqlitePlugin.deleteDatabase(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                }
            }
        }]), angular.module("ngCordova.plugins.statusbar", []).factory("$cordovaStatusbar", [function() {
            return {
                overlaysWebView: function(e) {
                    return StatusBar.overlaysWebView(!!e)
                },
                STYLES: {
                    DEFAULT: 0,
                    LIGHT_CONTENT: 1,
                    BLACK_TRANSLUCENT: 2,
                    BLACK_OPAQUE: 3
                },
                style: function(e) {
                    switch (e) {
                        case 0:
                            return StatusBar.styleDefault();
                        case 1:
                            return StatusBar.styleLightContent();
                        case 2:
                            return StatusBar.styleBlackTranslucent();
                        case 3:
                            return StatusBar.styleBlackOpaque();
                        default:
                            return StatusBar.styleDefault()
                    }
                },
                styleColor: function(e) {
                    return StatusBar.backgroundColorByName(e)
                },
                styleHex: function(e) {
                    return StatusBar.backgroundColorByHexString(e)
                },
                hide: function() {
                    return StatusBar.hide()
                },
                show: function() {
                    return StatusBar.show()
                },
                isVisible: function() {
                    return StatusBar.isVisible
                }
            }
        }]), angular.module("ngCordova.plugins.toast", []).factory("$cordovaToast", ["$q", "$window", function(e, n) {
            return {
                showShortTop: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showShortTop(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                showShortCenter: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showShortCenter(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                showShortBottom: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showShortBottom(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                showLongTop: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showLongTop(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                showLongCenter: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showLongCenter(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                showLongBottom: function(t) {
                    var r = e.defer();
                    return n.plugins.toast.showLongBottom(t, function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }), r.promise
                },
                show: function(t, r, o) {
                    var i = e.defer();
                    return n.plugins.toast.show(t, r, o, function(e) {
                        i.resolve(e)
                    }, function(e) {
                        i.reject(e)
                    }), i.promise
                }
            }
        }]), angular.module("ngCordova.plugins.touchid", []).factory("$cordovaTouchID", ["$q", function(e) {
            return {
                checkSupport: function() {
                    var n = e.defer();
                    return window.cordova ? touchid.checkSupport(function(e) {
                        n.resolve(e)
                    }, function(e) {
                        n.reject(e)
                    }) : n.reject("Not supported without cordova.js"), n.promise
                },
                authenticate: function(n) {
                    var t = e.defer();
                    return window.cordova ? touchid.authenticate(function(e) {
                        t.resolve(e)
                    }, function(e) {
                        t.reject(e)
                    }, n) : t.reject("Not supported without cordova.js"), t.promise
                }
            }
        }]), angular.module("ngCordova.plugins.vibration", []).factory("$cordovaVibration", [function() {
            return {
                vibrate: function(e) {
                    return navigator.notification.vibrate(e)
                },
                vibrateWithPattern: function(e, n) {
                    return navigator.notification.vibrateWithPattern(e, n)
                },
                cancelVibration: function() {
                    return navigator.notification.cancelVibration()
                }
            }
        }]), angular.module("ngCordova.plugins.videoCapturePlus", []).provider("$cordovaVideoCapturePlus", [function() {
            var e = {};
            this.setLimit = function(n) {
                e.limit = n
            }, this.setMaxDuration = function(n) {
                e.duration = n
            }, this.setHighQuality = function(n) {
                e.highquality = n
            }, this.useFrontCamera = function(n) {
                e.frontcamera = n
            }, this.setPortraitOverlay = function(n) {
                e.portraitOverlay = n
            }, this.setLandscapeOverlay = function(n) {
                e.landscapeOverlay = n
            }, this.setOverlayText = function(n) {
                e.overlayText = n
            }, this.$get = ["$q", "$window", function(n, t) {
                return {
                    captureVideo: function(r) {
                        var o = n.defer();
                        return t.plugins.videocaptureplus ? (t.plugins.videocaptureplus.captureVideo(o.resolve, o.reject, angular.extend({}, e, r)), o.promise) : (o.resolve(null), o.promise)
                    }
                }
            }]
        }]), angular.module("ngCordova.plugins.zip", []).factory("$cordovaZip", ["$q", "$window", function(e, n) {
            return {
                unzip: function(t, r) {
                    var o = e.defer();
                    return n.zip.unzip(t, r, function(e) {
                        0 === e ? o.resolve() : o.reject()
                    }, function(e) {
                        o.notify(e)
                    }), o.promise
                }
            }
        }]), angular.module("oauth.providers", ["oauth.utils"]).factory("$cordovaOauth", ["$q", "$http", "$cordovaOauthUtility", function(e, n, t) {
            return {
                adfs: function(r, o, i) {
                    var a = e.defer();
                    if (window.cordova) {
                        var c = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(c) === !0) {
                            var s = window.open(o + "/adfs/oauth2/authorize?response_type=code&client_id=" + r + "&redirect_uri=http://localhost/callback&resource=" + i, "_blank", "location=no");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf("http://localhost/callback")) {
                                    var t = e.url.split("code=")[1];
                                    n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                        method: "post",
                                        url: o + "/adfs/oauth2/token",
                                        data: "client_id=" + r + "&code=" + t + "&redirect_uri=http://localhost/callback&grant_type=authorization_code"
                                    }).success(function(e) {
                                        a.resolve(e)
                                    }).error(function(e, n) {
                                        a.reject("Problem authenticating")
                                    })["finally"](function() {
                                        setTimeout(function() {
                                            s.close()
                                        }, 10)
                                    })
                                }
                            }), s.addEventListener("exit", function(e) {
                                a.reject("The sign in flow was canceled")
                            })
                        } else a.reject("Could not find InAppBrowser plugin")
                    } else a.reject("Cannot authenticate via a web browser");
                    return a.promise
                },
                dropbox: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://www.dropbox.com/1/oauth2/authorize?client_id=" + n + "&redirect_uri=" + a + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve({
                                        access_token: r.access_token,
                                        token_type: r.token_type,
                                        uid: r.uid
                                    }) : o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                digitalOcean: function(r, o, i) {
                    var a = e.defer();
                    if (window.cordova) {
                        var c = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(c) === !0) {
                            var s = "http://localhost/callback";
                            void 0 !== i && i.hasOwnProperty("redirect_uri") && (s = i.redirect_uri);
                            var u = window.open("https://cloud.digitalocean.com/v1/oauth/authorize?client_id=" + r + "&redirect_uri=" + s + "&response_type=code&scope=read%20write", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            u.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(s)) {
                                    var t = e.url.split("code=")[1];
                                    n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                        method: "post",
                                        url: "https://cloud.digitalocean.com/v1/oauth/token",
                                        data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + s + "&grant_type=authorization_code&code=" + t
                                    }).success(function(e) {
                                        a.resolve(e)
                                    }).error(function(e, n) {
                                        a.reject("Problem authenticating")
                                    })["finally"](function() {
                                        setTimeout(function() {
                                            u.close()
                                        }, 10)
                                    })
                                }
                            }), u.addEventListener("exit", function(e) {
                                a.reject("The sign in flow was canceled")
                            })
                        } else a.reject("Could not find InAppBrowser plugin")
                    } else a.reject("Cannot authenticate via a web browser");
                    return a.promise
                },
                google: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://accounts.google.com/o/oauth2/auth?client_id=" + n + "&redirect_uri=" + c + "&scope=" + r.join(" ") + "&approval_prompt=force&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    s.removeEventListener("exit", function(e) {}), s.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        token_type: r.token_type,
                                        expires_in: r.expires_in
                                    }) : i.reject("Problem authenticating")
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                github: function(r, o, i, a) {
                    var c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = "http://localhost/callback";
                            void 0 !== a && a.hasOwnProperty("redirect_uri") && (u = a.redirect_uri);
                            var l = window.open("https://github.com/login/oauth/authorize?client_id=" + r + "&redirect_uri=" + u + "&scope=" + i.join(","), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf(u) && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n.defaults.headers.post.accept = "application/json", n({
                                    method: "post",
                                    url: "https://github.com/login/oauth/access_token",
                                    data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + u + "&code=" + requestToken
                                }).success(function(e) {
                                    c.resolve(e)
                                }).error(function(e, n) {
                                    c.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        l.close()
                                    }, 10)
                                }))
                            }), l.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                facebook: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = "https://www.facebook.com/v2.0/dialog/oauth?client_id=" + n + "&redirect_uri=" + c + "&response_type=token&scope=" + r.join(",");
                            void 0 !== o && o.hasOwnProperty("auth_type") && (s += "&auth_type=" + o.auth_type);
                            var u = window.open(s, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            u.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    u.removeEventListener("exit", function(e) {}), u.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in
                                    }) : 0 !== e.url.indexOf("error_code=100") ? i.reject("Facebook returned error_code=100: Invalid permissions") : i.reject("Problem authenticating")
                                }
                            }), u.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                linkedin: function(r, o, i, a, c) {
                    var s = e.defer();
                    if (window.cordova) {
                        var u = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(u) === !0) {
                            var l = "http://localhost/callback";
                            void 0 !== c && c.hasOwnProperty("redirect_uri") && (l = c.redirect_uri);
                            var d = window.open("https://www.linkedin.com/uas/oauth2/authorization?client_id=" + r + "&redirect_uri=" + l + "&scope=" + i.join(" ") + "&response_type=code&state=" + a, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            d.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf(l) && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: "https://www.linkedin.com/uas/oauth2/accessToken",
                                    data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + l + "&grant_type=authorization_code&code=" + requestToken
                                }).success(function(e) {
                                    s.resolve(e)
                                }).error(function(e, n) {
                                    s.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        d.close()
                                    }, 10)
                                }))
                            }), d.addEventListener("exit", function(e) {
                                s.reject("The sign in flow was canceled")
                            })
                        } else s.reject("Could not find InAppBrowser plugin")
                    } else s.reject("Cannot authenticate via a web browser");
                    return s.promise
                },
                instagram: function(n, r, o) {
                    var i = e.defer(),
                        a = {
                            code: "?",
                            token: "#"
                        };
                    if (window.cordova) {
                        var c = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(c) === !0) {
                            var s = "http://localhost/callback",
                                u = "token";
                            void 0 !== o && (o.hasOwnProperty("redirect_uri") && (s = o.redirect_uri), o.hasOwnProperty("response_type") && (u = o.response_type));
                            var l = window.open("https://api.instagram.com/oauth/authorize/?client_id=" + n + "&redirect_uri=" + s + "&scope=" + r.join(" ") + "&response_type=" + u, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(s)) {
                                    l.removeEventListener("exit", function(e) {}), l.close();
                                    var n = e.url.split(a[u])[1],
                                        r = t.parseResponseParameters(n);
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token
                                    }) : void 0 !== r.code && null !== r.code ? i.resolve({
                                        code: r.code
                                    }) : i.reject("Problem authenticating")
                                }
                            }), l.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                box: function(r, o, i, a) {
                    var c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = "http://localhost/callback";
                            void 0 !== a && a.hasOwnProperty("redirect_uri") && (u = a.redirect_uri);
                            var l = window.open("https://app.box.com/api/oauth2/authorize/?client_id=" + r + "&redirect_uri=" + u + "&state=" + i + "&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf(u) && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: "https://app.box.com/api/oauth2/token",
                                    data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + u + "&grant_type=authorization_code&code=" + requestToken
                                }).success(function(e) {
                                    c.resolve(e)
                                }).error(function(e, n) {
                                    c.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        l.close()
                                    }, 10)
                                }))
                            }), l.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                reddit: function(r, o, i, a, c) {
                    var s = e.defer();
                    if (window.cordova) {
                        var u = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(u) === !0) {
                            var l = "http://localhost/callback";
                            void 0 !== c && c.hasOwnProperty("redirect_uri") && (l = c.redirect_uri);
                            var d = window.open("https://ssl.reddit.com/api/v1/authorize?client_id=" + r + "&redirect_uri=" + l + "&duration=permanent&state=ngcordovaoauth&scope=" + i.join(",") + "&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            d.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf(l) && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n.defaults.headers.post.Authorization = "Basic " + btoa(r + ":" + o), n({
                                    method: "post",
                                    url: "https://ssl.reddit.com/api/v1/access_token",
                                    data: "redirect_uri=" + l + "&grant_type=authorization_code&code=" + requestToken
                                }).success(function(e) {
                                    s.resolve(e)
                                }).error(function(e, n) {
                                    s.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        d.close()
                                    }, 10)
                                }))
                            }), d.addEventListener("exit", function(e) {
                                s.reject("The sign in flow was canceled")
                            })
                        } else s.reject("Could not find InAppBrowser plugin")
                    } else s.reject("Cannot authenticate via a web browser");
                    return s.promise
                },
                twitter: function(r, o, i) {
                    var a = e.defer();
                    if (window.cordova) {
                        var c = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(c) === !0) {
                            var s = "http://localhost/callback";
                            if (void 0 !== i && i.hasOwnProperty("redirect_uri") && (s = i.redirect_uri), "undefined" != typeof jsSHA) {
                                var u = {
                                        oauth_consumer_key: r,
                                        oauth_nonce: t.createNonce(10),
                                        oauth_signature_method: "HMAC-SHA1",
                                        oauth_timestamp: Math.round((new Date).getTime() / 1e3),
                                        oauth_version: "1.0"
                                    },
                                    l = t.createSignature("POST", "https://api.twitter.com/oauth/request_token", u, {
                                        oauth_callback: s
                                    }, o);
                                n({
                                    method: "post",
                                    url: "https://api.twitter.com/oauth/request_token",
                                    headers: {
                                        Authorization: l.authorization_header,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    data: "oauth_callback=" + encodeURIComponent(s)
                                }).success(function(e) {
                                    for (var r = e.split("&"), i = {}, c = 0; c < r.length; c++) i[r[c].split("=")[0]] = r[c].split("=")[1];
                                    i.hasOwnProperty("oauth_token") === !1 && a.reject("Oauth request token was not received");
                                    var l = window.open("https://api.twitter.com/oauth/authenticate?oauth_token=" + i.oauth_token, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                                    l.addEventListener("loadstart", function(e) {
                                        if (0 === e.url.indexOf(s)) {
                                            for (var r = e.url.split("?")[1], i = r.split("&"), c = {}, d = 0; d < i.length; d++) c[i[d].split("=")[0]] = i[d].split("=")[1];
                                            c.hasOwnProperty("oauth_verifier") === !1 && a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"), delete u.oauth_signature, u.oauth_token = c.oauth_token;
                                            var f = t.createSignature("POST", "https://api.twitter.com/oauth/access_token", u, {
                                                oauth_verifier: c.oauth_verifier
                                            }, o);
                                            n({
                                                method: "post",
                                                url: "https://api.twitter.com/oauth/access_token",
                                                headers: {
                                                    Authorization: f.authorization_header
                                                },
                                                params: {
                                                    oauth_verifier: c.oauth_verifier
                                                }
                                            }).success(function(e) {
                                                for (var n = e.split("&"), t = {}, r = 0; r < n.length; r++) t[n[r].split("=")[0]] = n[r].split("=")[1];
                                                t.hasOwnProperty("oauth_token_secret") === !1 && a.reject("Oauth access token was not received"), a.resolve(t)
                                            }).error(function(e) {
                                                a.reject(e)
                                            })["finally"](function() {
                                                setTimeout(function() {
                                                    l.close()
                                                }, 10)
                                            })
                                        }
                                    }), l.addEventListener("exit", function(e) {
                                        a.reject("The sign in flow was canceled")
                                    })
                                }).error(function(e) {
                                    a.reject(e)
                                })
                            } else a.reject("Missing jsSHA JavaScript library")
                        } else a.reject("Could not find InAppBrowser plugin")
                    } else a.reject("Cannot authenticate via a web browser");
                    return a.promise
                },
                meetup: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://secure.meetup.com/oauth2/authorize/?client_id=" + n + "&redirect_uri=" + a + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = {}, i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve(r) : o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                salesforce: function(n, r) {
                    var o = "http://localhost/callback",
                        i = function(e, n, t) {
                            return e + "services/oauth2/authorize?display=touch&response_type=token&client_id=" + escape(n) + "&redirect_uri=" + escape(t)
                        },
                        a = function(e, n) {
                            return e.substr(0, n.length) === n
                        },
                        c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = window.open(i(n, r, o), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            u.addEventListener("loadstart", function(e) {
                                if (a(e.url, o)) {
                                    var n = {},
                                        t = e.url.split("#")[1];
                                    if (t) {
                                        var r = t.split("&");
                                        for (var i in r) {
                                            var s = r[i].split("=");
                                            n[s[0]] = unescape(s[1])
                                        }
                                    }
                                    "undefined" == typeof n || "undefined" == typeof n.access_token ? c.reject("Problem authenticating") : c.resolve(n), setTimeout(function() {
                                        u.close()
                                    }, 10)
                                }
                            }), u.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                strava: function(r, o, i, a) {
                    var c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = "http://localhost/callback";
                            void 0 !== a && a.hasOwnProperty("redirect_uri") && (u = a.redirect_uri);
                            var l = window.open("https://www.strava.com/oauth/authorize?client_id=" + r + "&redirect_uri=" + u + "&scope=" + i.join(",") + "&response_type=code&approval_prompt=force", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf(u) && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: "https://www.strava.com/oauth/token",
                                    data: "client_id=" + r + "&client_secret=" + o + "&code=" + requestToken
                                }).success(function(e) {
                                    c.resolve(e)
                                }).error(function(e, n) {
                                    c.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        l.close()
                                    }, 10)
                                }))
                            }), l.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                withings: function(r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0)
                            if ("undefined" != typeof jsSHA) {
                                var c = t.generateOauthParametersInstance(r);
                                c.oauth_callback = "http://localhost/callback";
                                var s = "https://oauth.withings.com/account/request_token",
                                    u = t.createSignature("GET", s, {}, c, o);
                                c.oauth_signature = u.signature;
                                var l = t.generateUrlParameters(c);
                                n({
                                    method: "get",
                                    url: s + "?" + l
                                }).success(function(e) {
                                    var a = t.parseResponseParameters(e);
                                    a.hasOwnProperty("oauth_token") === !1 && i.reject("Oauth request token was not received");
                                    var c = t.generateOauthParametersInstance(r);
                                    c.oauth_token = a.oauth_token;
                                    var s = a.oauth_token_secret,
                                        u = "https://oauth.withings.com/account/authorize",
                                        l = t.createSignature("GET", u, {}, c, o);
                                    c.oauth_signature = l.signature;
                                    var d = t.generateUrlParameters(c),
                                        f = window.open(u + "?" + d, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                                    f.addEventListener("loadstart", function(e) {
                                        if (0 === e.url.indexOf("http://localhost/callback")) {
                                            var c = e.url.split("?")[1];
                                            a = t.parseResponseParameters(c), a.hasOwnProperty("oauth_verifier") === !1 && i.reject("Browser authentication failed to complete.  No oauth_verifier was returned");
                                            var u = t.generateOauthParametersInstance(r);
                                            u.oauth_token = a.oauth_token;
                                            var l = "https://oauth.withings.com/account/access_token",
                                                d = t.createSignature("GET", l, {}, u, o, s);
                                            u.oauth_signature = d.signature;
                                            var p = t.generateUrlParameters(u);
                                            n({
                                                method: "get",
                                                url: l + "?" + p
                                            }).success(function(e) {
                                                var n = t.parseResponseParameters(e);
                                                n.hasOwnProperty("oauth_token_secret") === !1 && i.reject("Oauth access token was not received"), i.resolve(n)
                                            }).error(function(e) {
                                                i.reject(e)
                                            })["finally"](function() {
                                                setTimeout(function() {
                                                    f.close()
                                                }, 10)
                                            })
                                        }
                                    }), f.addEventListener("exit", function(e) {
                                        i.reject("The sign in flow was canceled")
                                    })
                                }).error(function(e) {
                                    i.reject(e)
                                })
                            } else i.reject("Missing jsSHA JavaScript library");
                        else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                foursquare: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://foursquare.com/oauth2/authenticate?client_id=" + n + "&redirect_uri=" + a + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    if (void 0 !== r.access_token && null !== r.access_token) {
                                        var s = {
                                            access_token: r.access_token,
                                            expires_in: r.expires_in
                                        };
                                        o.resolve(s)
                                    } else o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                magento: function(r, o, i) {
                    var a = e.defer();
                    if (window.cordova) {
                        var c = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(c) === !0)
                            if ("undefined" != typeof jsSHA) {
                                var s = {
                                        oauth_callback: "http://localhost/callback",
                                        oauth_consumer_key: o,
                                        oauth_nonce: t.createNonce(5),
                                        oauth_signature_method: "HMAC-SHA1",
                                        oauth_timestamp: Math.round((new Date).getTime() / 1e3),
                                        oauth_version: "1.0"
                                    },
                                    u = t.createSignature("POST", r + "/oauth/initiate", s, {
                                        oauth_callback: "http://localhost/callback"
                                    }, i);
                                n.defaults.headers.post.Authorization = u.authorization_header, n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: r + "/oauth/initiate",
                                    data: "oauth_callback=http://localhost/callback"
                                }).success(function(e) {
                                    for (var o = e.split("&"), c = {}, u = 0; u < o.length; u++) c[o[u].split("=")[0]] = o[u].split("=")[1];
                                    c.hasOwnProperty("oauth_token") === !1 && a.reject("Oauth request token was not received");
                                    var l = c.oauth_token_secret,
                                        d = window.open(r + "/oauth/authorize?oauth_token=" + c.oauth_token, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                                    d.addEventListener("loadstart", function(e) {
                                        if (0 === e.url.indexOf("http://localhost/callback")) {
                                            for (var o = e.url.split("?")[1], c = o.split("&"), u = {}, f = 0; f < c.length; f++) u[c[f].split("=")[0]] = c[f].split("=")[1];
                                            u.hasOwnProperty("oauth_verifier") === !1 && a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"), delete s.oauth_signature, delete s.oauth_callback, s.oauth_token = u.oauth_token, s.oauth_nonce = t.createNonce(5), s.oauth_verifier = u.oauth_verifier;
                                            var p = t.createSignature("POST", r + "/oauth/token", s, {}, i, l);
                                            n.defaults.headers.post.Authorization = p.authorization_header, n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                                method: "post",
                                                url: r + "/oauth/token"
                                            }).success(function(e) {
                                                for (var n = e.split("&"), t = {}, r = 0; r < n.length; r++) t[n[r].split("=")[0]] = n[r].split("=")[1];
                                                t.hasOwnProperty("oauth_token_secret") === !1 && a.reject("Oauth access token was not received"), a.resolve(t)
                                            }).error(function(e) {
                                                a.reject(e)
                                            })["finally"](function() {
                                                setTimeout(function() {
                                                    d.close()
                                                }, 10)
                                            })
                                        }
                                    }), d.addEventListener("exit", function(e) {
                                        a.reject("The sign in flow was canceled")
                                    })
                                }).error(function(e) {
                                    a.reject(e)
                                })
                            } else a.reject("Missing jsSHA JavaScript library");
                        else a.reject("Could not find InAppBrowser plugin")
                    } else a.reject("Cannot authenticate via a web browser");
                    return a.promise
                },
                vkontakte: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = window.open("https://oauth.vk.com/authorize?client_id=" + n + "&redirect_uri=http://oauth.vk.com/blank.html&response_type=token&scope=" + r.join(",") + "&display=touch&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            a.addEventListener("loadstart", function(e) {
                                var n = e.url.split("#");
                                if ("https://oauth.vk.com/blank.html" == n[0] || "http://oauth.vk.com/blank.html" == n[0]) {
                                    a.removeEventListener("exit", function(e) {}), a.close();
                                    for (var t = e.url.split("#")[1], r = t.split("&"), i = [], c = 0; c < r.length; c++) i[r[c].split("=")[0]] = r[c].split("=")[1];
                                    if (void 0 !== i.access_token && null !== i.access_token) {
                                        var s = {
                                            access_token: i.access_token,
                                            expires_in: i.expires_in
                                        };
                                        void 0 !== i.email && null !== i.email && (s.email = i.email), o.resolve(s)
                                    } else o.reject("Problem authenticating")
                                }
                            }), a.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                odnoklassniki: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = window.open("http://www.odnoklassniki.ru/oauth/authorize?client_id=" + n + "&scope=" + r.join(",") + "&response_type=token&redirect_uri=http://localhost/callback&layout=m", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            a.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf("http://localhost/callback")) {
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve({
                                        access_token: r.access_token,
                                        session_secret_key: r.session_secret_key
                                    }) : o.reject("Problem authenticating"), setTimeout(function() {
                                        a.close()
                                    }, 10)
                                }
                            }), a.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                imgur: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://api.imgur.com/oauth2/authorize?client_id=" + n + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in,
                                        account_username: r.account_username
                                    }) : o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                spotify: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://accounts.spotify.com/authorize?client_id=" + n + "&redirect_uri=" + c + "&response_type=token&scope=" + r.join(" "), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    s.removeEventListener("exit", function(e) {}), s.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in,
                                        account_username: r.account_username
                                    }) : i.reject("Problem authenticating")
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                uber: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://login.uber.com/oauth/authorize?client_id=" + n + "&redirect_uri=" + c + "&response_type=token&scope=" + r.join(" "), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    s.removeEventListener("exit", function(e) {}), s.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        token_type: r.token_type,
                                        expires_in: r.expires_in,
                                        scope: r.scope
                                    }) : i.reject("Problem authenticating")
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                windowsLive: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "https://login.live.com/oauth20_desktop.srf";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://login.live.com/oauth20_authorize.srf?client_id=" + n + "&scope=" + r.join(",") + "&response_type=token&display=touch&redirect_uri=" + c, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    s.removeEventListener("exit", function(e) {}), s.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in
                                    }) : i.reject("Problem authenticating")
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                yammer: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://www.yammer.com/dialog/oauth?client_id=" + n + "&redirect_uri=" + a + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve({
                                        access_token: r.access_token
                                    }) : o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                },
                venmo: function(n, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(a) === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://api.venmo.com/v1/oauth/authorize?client_id=" + n + "&redirect_uri=" + c + "&response_type=token&scope=" + r.join(" "), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    s.removeEventListener("exit", function(e) {}), s.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], o = 0; o < t.length; o++) r[t[o].split("=")[0]] = t[o].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? i.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in
                                    }) : i.reject("Problem authenticating")
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                stripe: function(r, o, i, a) {
                    var c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = "http://localhost/callback";
                            void 0 !== a && a.hasOwnProperty("redirect_uri") && (u = a.redirect_uri);
                            var l = window.open("https://connect.stripe.com/oauth/authorize?client_id=" + r + "&redirect_uri=" + u + "&scope=" + i + "&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf("http://localhost/callback") && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: "https://connect.stripe.com/oauth/token",
                                    data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + u + "&grant_type=authorization_code&code=" + requestToken
                                }).success(function(e) {
                                    c.resolve(e)
                                }).error(function(e, n) {
                                    c.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        l.close()
                                    }, 10)
                                }))
                            }), l.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                rally: function(r, o, i, a) {
                    var c = e.defer();
                    if (window.cordova) {
                        var s = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(s) === !0) {
                            var u = "http://localhost/callback";
                            void 0 !== a && a.hasOwnProperty("redirect_uri") && (u = a.redirect_uri);
                            var l = window.open("https://rally1.rallydev.com/login/oauth2/auth?client_id=" + r + "&redirect_uri=" + u + "&scope=" + i + "&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            l.addEventListener("loadstart", function(e) {
                                0 === e.url.indexOf("http://localhost/callback") && (requestToken = e.url.split("code=")[1], n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                    method: "post",
                                    url: "https://rally1.rallydev.com/login/oauth2/auth",
                                    data: "client_id=" + r + "&client_secret=" + o + "&redirect_uri=" + u + "&grant_type=authorization_code&code=" + requestToken
                                }).success(function(e) {
                                    c.resolve(e)
                                }).error(function(e, n) {
                                    c.reject("Problem authenticating")
                                })["finally"](function() {
                                    setTimeout(function() {
                                        l.close()
                                    }, 10)
                                }))
                            }), l.addEventListener("exit", function(e) {
                                c.reject("The sign in flow was canceled")
                            })
                        } else c.reject("Could not find InAppBrowser plugin")
                    } else c.reject("Cannot authenticate via a web browser");
                    return c.promise
                },
                familySearch: function(t, r, o) {
                    var i = e.defer();
                    if (window.cordova) {
                        var a = cordova.require("cordova/plugin_list").metadata;
                        if (a.hasOwnProperty("cordova-plugin-inappbrowser") === !0) {
                            var c = "http://localhost/callback";
                            void 0 !== o && o.hasOwnProperty("redirect_uri") && (c = o.redirect_uri);
                            var s = window.open("https://ident.familysearch.org/cis-web/oauth2/v3/authorization?client_id=" + t + "&redirect_uri=" + c + "&response_type=code&state=" + r, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            s.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(c)) {
                                    var r = e.url.split("code=")[1];
                                    n.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", n({
                                        method: "post",
                                        url: "https://ident.familysearch.org/cis-web/oauth2/v3/token",
                                        data: "client_id=" + t + "&redirect_uri=" + c + "&grant_type=authorization_code&code=" + r
                                    }).success(function(e) {
                                        i.resolve(e)
                                    }).error(function(e, n) {
                                        i.reject("Problem authenticating")
                                    })["finally"](function() {
                                        setTimeout(function() {
                                            s.close()
                                        }, 10)
                                    })
                                }
                            }), s.addEventListener("exit", function(e) {
                                i.reject("The sign in flow was canceled")
                            })
                        } else i.reject("Could not find InAppBrowser plugin")
                    } else i.reject("Cannot authenticate via a web browser");
                    return i.promise
                },
                envato: function(n, r) {
                    var o = e.defer();
                    if (window.cordova) {
                        var i = cordova.require("cordova/plugin_list").metadata;
                        if (t.isInAppBrowserInstalled(i) === !0) {
                            var a = "http://localhost/callback";
                            void 0 !== r && r.hasOwnProperty("redirect_uri") && (a = r.redirect_uri);
                            var c = window.open("https://api.envato.com/authorization?client_id=" + n + "&redirect_uri=" + a + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                            c.addEventListener("loadstart", function(e) {
                                if (0 === e.url.indexOf(a)) {
                                    c.removeEventListener("exit", function(e) {}), c.close();
                                    for (var n = e.url.split("#")[1], t = n.split("&"), r = [], i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
                                    void 0 !== r.access_token && null !== r.access_token ? o.resolve({
                                        access_token: r.access_token,
                                        expires_in: r.expires_in
                                    }) : o.reject("Problem authenticating")
                                }
                            }), c.addEventListener("exit", function(e) {
                                o.reject("The sign in flow was canceled")
                            })
                        } else o.reject("Could not find InAppBrowser plugin")
                    } else o.reject("Cannot authenticate via a web browser");
                    return o.promise
                }
            }
        }]), angular.module("ngCordovaOauth", ["oauth.providers", "oauth.utils"]), angular.module("oauth.utils", []).factory("$cordovaOauthUtility", ["$q", function(e) {
            return {
                isInAppBrowserInstalled: function(e) {
                    var n = ["cordova-plugin-inappbrowser", "org.apache.cordova.inappbrowser"];
                    return n.some(function(n) {
                        return e.hasOwnProperty(n)
                    })
                },
                createSignature: function(e, n, t, r, o, i) {
                    if ("undefined" != typeof jsSHA) {
                        for (var a = angular.copy(t), c = Object.keys(r), s = 0; s < c.length; s++) a[c[s]] = encodeURIComponent(r[c[s]]);
                        var u = e + "&" + encodeURIComponent(n) + "&",
                            l = Object.keys(a).sort();
                        for (s = 0; s < l.length; s++) u += s == l.length - 1 ? encodeURIComponent(l[s] + "=" + a[l[s]]) : encodeURIComponent(l[s] + "=" + a[l[s]] + "&");
                        var d = new jsSHA(u, "TEXT"),
                            f = "";
                        i && (f = encodeURIComponent(i)), t.oauth_signature = encodeURIComponent(d.getHMAC(encodeURIComponent(o) + "&" + f, "TEXT", "SHA-1", "B64"));
                        var p = Object.keys(t),
                            v = "OAuth ";
                        for (s = 0; s < p.length; s++) v += s == p.length - 1 ? p[s] + '="' + t[p[s]] + '"' : p[s] + '="' + t[p[s]] + '",';
                        return {
                            signature_base_string: u,
                            authorization_header: v,
                            signature: t.oauth_signature
                        }
                    }
                    return "Missing jsSHA JavaScript library"
                },
                createNonce: function(e) {
                    for (var n = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; e > r; r++) n += t.charAt(Math.floor(Math.random() * t.length));
                    return n
                },
                generateUrlParameters: function(e) {
                    var n = Object.keys(e);
                    n.sort();
                    for (var t = "", r = "", o = 0; o < n.length; o++) t += r + n[o] + "=" + e[n[o]], r = "&";
                    return t
                },
                parseResponseParameters: function(e) {
                    if (e.split) {
                        for (var n = e.split("&"), t = {}, r = 0; r < n.length; r++) t[n[r].split("=")[0]] = n[r].split("=")[1];
                        return t
                    }
                    return {}
                },
                generateOauthParametersInstance: function(e) {
                    var n = new jsSHA(Math.round((new Date).getTime() / 1e3), "TEXT"),
                        t = {
                            oauth_consumer_key: e,
                            oauth_nonce: n.getHash("SHA-1", "HEX"),
                            oauth_signature_method: "HMAC-SHA1",
                            oauth_timestamp: Math.round((new Date).getTime() / 1e3),
                            oauth_version: "1.0"
                        };
                    return t
                }
            }
        }])
}();