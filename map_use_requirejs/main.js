require.config(
    {
　　　　paths: {
　　　　　　leaflet: "leaflet",
            proj4:"proj4",
            esri:"esri-leaflet",
            vue:"vue"
　　　　}
　　}
);

require(['leaflet','esri','vue','proj4'],function (L,esri,Vue,proj4) {
    new Vue({
        el:'#mapid',
        data:{},
        methods:{
        tms_init(){
          L.TileLayer.ChinaProvider = L.TileLayer.extend({
    
              initialize: function(type, options) { // (type, Object)
                  var providers = L.TileLayer.ChinaProvider.providers;
    
                  var parts = type.split('.');
    
                  var providerName = parts[0];
                  var mapName = parts[1];
                  var mapType = parts[2];
    
                  var url = providers[providerName][mapName][mapType];
                  options.subdomains = providers[providerName].Subdomains;
    
                  L.TileLayer.prototype.initialize.call(this, url, options);
              }
          });
    
          L.TileLayer.ChinaProvider.providers = {
              TianDiTu: {
                  Normal: {
                      Map: "http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
                      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}",
                  },
                  Satellite: {
                      Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
                      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}",
                  },
                  Terrain: {
                      Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
                      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}",
                  },
                  Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
              },
    
              GaoDe: {
                  Normal: {
                      Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                  },
                  Satellite: {
                      Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                      Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
                  },
                  Subdomains: ["1", "2", "3", "4"]
              },
    
              Google: {
                  Normal: {
                      Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                  },
                  Satellite: {
                      Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                  },
                  Subdomains: []
              },
    
              Geoq: {
                  Normal: {
                      Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
                      Color: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
                      PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                      Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
                      Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
                      Cold: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}"
                  },
                  Subdomains: []
    
              }
          };
    
          L.tileLayer.chinaProvider = function(type, options) {
              return new L.TileLayer.ChinaProvider(type, options);
          };
        },
        map_init(){
          var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                  maxZoom: 18,
                  minZoom: 5
              }),
              normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                  maxZoom: 18,
                  minZoom: 5
              }),
              imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                  maxZoom: 18,
                  minZoom: 5
              }),
              imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                  maxZoom: 18,
                  minZoom: 5
              });
          var normal = L.layerGroup([normalm, normala]),
              image = L.layerGroup([imgm, imga]);
          var baseLayers = {
              "地图": normal,
              "影像": image,
          }
          var overlayLayers = {
          }
          var map = L.map("mapid", {
              center:[ 0.18917049371396785, 110.51044464111328],// [31.59, 120.29],
              zoom: 12,
              layers: [normal],
              zoomControl: false
          });
          L.control.layers(baseLayers, overlayLayers).addTo(map);
          L.control.zoom({
              zoomInTitle: '放大',
              zoomOutTitle: '缩小'
          }).addTo(map);
          this.map = map;
        },  
        initGuanxianI(index){   
            let self = this;
            //let map = self.map;
            let prefix = "",
                JunctionResult = "/ZTMapServer/ArcGIS/rest/services/JunctionResult/MapServer/0",
                PipeResult = "/ZTMapServer/ArcGIS/rest/services/PipeResult/MapServer/0";
            let oriUrl,path;
            switch(index){
                case 2:     //给水
                    //oriUrl = "/ZTMapServer/ArcGIS/rest/services/pipe/MapServer";
                    // oriUrl = "/JSMapServer/arcgis/rest/services/SZSW_DPZS/SWAT_PIPE_DP/MapServer";
                    oriUrl = "http://138.0.0.186:6080/arcgis/rest/services/SZSW_DPZS/SWAT_PIPE_DP/MapServer";
                    oriUrl = "http://112.64.170.158:8888/ArcGIS/rest/services/nb_pipe/MapServer";
                    oriUrl = "http://112.64.170.158:8888/ArcGIS/rest/services/SZ-ysgj/MapServer"
                break;
                case 3:     //排水
                    //oriUrl = "/ZTMapServer/ArcGIS/rest/services/wspipe/MapServer";
                    oriUrl = "/JSMapServer/arcgis/rest/services/SZSW_DPZS/DRAIN_PIPE_DP/MapServer";
                break;
                case 4:     //水力模型结果（压力、水力坡度、需水量、水龄等）
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/JunctionResult/MapServer";
                break;
                case 5:     //水力模型结果（流量、流速、供水分界线等）
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/PipeResult/MapServer";
                break;
                case 6:     //原水管网
                    //oriUrl = "/ZTMapServer/ArcGIS/rest/services/ys-pipe/MapServer";
                    oriUrl = "/JSMapServer/arcgis/rest/services/SZSW_DPZS/SWAT_RAWPIPE_DP/MapServer";
                break;
                //  *********以下是12月16日 添加 By Bale *******
                case 7:    //原水管网
                    //oriUrl = "/ZTMapServer/ArcGIS/rest/services/ys-pipe/MapServer";
                    oriUrl = "/JSMapServer/arcgis/rest/services/SZSW_DPZS/SWAT_RAWPIPE_DP/MapServer";
                break;
                case 8:    //原水阀门
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/ysfm/MapServer";
                break;
                case 9:    //原水管件
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/ysgj/MapServer";
                break;
                case 10:    //原水水源点
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/yssyd/MapServer";
                break;
                case 11:    //压力
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/JunctionResult-p/MapServer";
                break;
                case 12:    //水龄
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/JunctionResult-age/MapServer";
                break;
                case 13:    //流速
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-v/MapServer";
                break;
                case 14:    //流量
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-f/MapServer";
                break;
                case 15:    //管径
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-di/MapServer";
                break;
                case 16:    //水厂供水范围
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-gsqy/MapServer";
                break;
                //  2017/12/16
                //  2017/12/23
                case 17:    //压力对比
                        //    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-p-d/MapServer";
                    path = esri.crsfeatureLayer({
                        url: prefix + JunctionResult,
                        style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Pressure_0;
                        if(yl==null){
                            c = "#fff";
                            o = 0;
                        }else{
                            if(yl<=24){
                            c = "#FF3643";
                            }else if(yl>24&&yl<=30){
                            c = "#17B2E5";
                            }else if(yl>30&&yl<=36){
                            c = "#8aff00";
                            }else if(yl>36&&yl<=42){
                            c = "#FF7200";
                            }else if(yl>42){
                            c = "#FFFF1F";
                            }
                        }
                        return {color:"#000",fillColor: c, opacity: o, weight: 1,fillOpacity:1};
                        },
                        pointToLayer: function (geojson, latlng) {
                        return L.circleMarker(latlng, {radius:4});
                        },
                        renderer:L.canvas()
                    });
                break;
                case 18:    //流量对比
                        //    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-f-d/MapServer";
                    path = esri.crsfeatureLayer({
                        url: prefix + PipeResult,
                        style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Flow_0;
                        if(yl==null){
                            c = "#fff";
                            o = 0;
                        }else{
                            if(yl<=-500){
                            c = "#FF3643";
                            }else if(yl>-500&&yl<=0){
                            c = "#17B2E5";
                            }else if(yl>0&&yl<=200){
                            c = "#8aff00";
                            }else if(yl>200&&yl<=500){
                            c = "#FF7200";
                            }else if(yl>500){
                            c = "#FFFF1F";
                            }
                        }
                        return {color: c, opacity: o, weight: 3};
                        },
                        renderer:L.canvas()
                    });
                break;
                case 19:    //流速对比
                        //    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-v-d/MapServer";
                    path = esri.crsfeatureLayer({
                        url: prefix + PipeResult,
                        style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Velocity_0;
                        if(yl==null){
                            c = "#fff";
                            o = 0;
                        }else{
                            if(yl<=0.05){
                            c = "#FF3643";
                            }else if(yl>0.05&&yl<=0.1){
                            c = "#17B2E5";
                            }else if(yl>0.1&&yl<=0.2){
                            c = "#8aff00";
                            }else if(yl>0.2&&yl<=0.5){
                            c = "#FF7200";
                            }else if(yl>0.5){
                            c = "#FFFF1F";
                            }
                        }
                        return {color: c, opacity: o, weight: 3};
                        },
                        renderer:L.canvas()
                    });
                break;
                case 20:    //供水区域对比
                        //    oriUrl = "/ZTMapServer/ArcGIS/rest/services/Piperesult-gsqy-d/MapServer";
                    path = esri.crsfeatureLayer({
                        url: prefix + PipeResult,
                        style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_SupplyArea_0;
                        if(yl==null){
                            c = "#fff";
                            o = 0;
                        }else{
                            yl = parseFloat(yl);
                            if(yl==218481){
                            c = "#FF3643";//东湖水厂
                            }else if(yl==218484){
                            c = "#17B2E5";//南山水厂
                            }else if(yl==218499){
                            c = "#8aff00";//大涌水厂
                            }else if(yl==218504){
                            c = "#FF7200";//梅林水厂
                            }else if(yl==218509){
                            c = "#FFFF1F";//笔架山水厂
                            }else{
                            c = "#fff";
                            o = 0;
                            }
                        }
                        return {color: c, opacity: o, weight: 3};
                        },
                        renderer:L.canvas()
                    });
                break;
                case 21:    //排水检查井
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/ps-TCV/MapServer";
                break;
                //  2017/12/23
                case 22:    //水力模型-排水溯源
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/BaseMap_szps/MapServer";
                    break;
                case 23:    //供水阀门
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/TCV/MapServer";
                    break;
                case 24:    //排水阀门
                    oriUrl = "/ZTMapServer/ArcGIS/rest/services/ps-TCV/MapServer";
                    break;
                case 25:    //水压标高
                    path = esri.crsfeatureLayer({
                    url: prefix + JunctionResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_HydraulicGrade_0;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=30){
                            c = "#FF3643";
                        }else if(yl>30&&yl<=35){
                            c = "#17B2E5";
                        }else if(yl>35&&yl<=40){
                            c = "#8aff00";
                        }else if(yl>40&&yl<=45){
                            c = "#FF7200";
                        }else if(yl>45){
                            c = "#FFFF1F";
                        }
                        }
                        return {color:"#000",fillColor: c, opacity: o, weight: 1,fillOpacity:1};
                    },
                    pointToLayer: function (geojson, latlng) {
                        return L.circleMarker(latlng, {radius:4});
                    },
                    renderer:L.canvas()
                    });
                    break;
                case 26:    //节点水量
                    path = esri.crsfeatureLayer({
                    url: prefix + JunctionResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Demand_0;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=10){
                            c = "#FF3643";
                        }else if(yl>10&&yl<=20){
                            c = "#17B2E5";
                        }else if(yl>20&&yl<=50){
                            c = "#8aff00";
                        }else if(yl>50&&yl<=100){
                            c = "#FF7200";
                        }else if(yl>100){
                            c = "#FFFF1F";
                        }
                        }
                        return {color:"#000",fillColor: c, opacity: o, weight: 1,fillOpacity:1};
                    },
                    pointToLayer: function (geojson, latlng) {
                        return L.circleMarker(latlng, {radius:4});
                    },
                    renderer:L.canvas()
                    });
                    break;
                case 27:    //管径
                    path = esri.crsfeatureLayer({
                    url: prefix + PipeResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Physical_PipeDiameter;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=200){
                            c = "#FF3643";
                        }else if(yl>200&&yl<=400){
                            c = "#17B2E5";
                        }else if(yl>400&&yl<=600){
                            c = "#8aff00";
                        }else if(yl>600&&yl<=800){
                            c = "#FF7200";
                        }else if(yl>800){
                            c = "#FFFF1F";
                        }
                        }
                        return {color: c, opacity: o, weight: 3};
                    },
                    renderer:L.canvas(),
                    where:"Physical_PipeDiameter>100"
                    });
                    break;
                case 28:    //水力坡度
                    path = esri.crsfeatureLayer({
                    url: prefix + PipeResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Slop_0;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=0.01){
                            c = "#FF3643";
                        }else if(yl>0.01&&yl<=0.05){
                            c = "#17B2E5";
                        }else if(yl>0.05&&yl<=0.1){
                            c = "#8aff00";
                        }else if(yl>0.1&&yl<=0.2){
                            c = "#FF7200";
                        }else if(yl>0.2){
                            c = "#FFFF1F";
                        }
                        }
                        return {color: c, opacity: o, weight: 3};
                    },
                    renderer:L.canvas()
                    });
                    break;
                case 29:    //水龄
                    path = esri.crsfeatureLayer({
                    url: prefix + PipeResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_Age_0;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=24){
                            c = "#FF3643";
                        }else if(yl>24&&yl<=48){
                            c = "#17B2E5";
                        }else if(yl>48&&yl<=72){
                            c = "#8aff00";
                        }else if(yl>72&&yl<=96){
                            c = "#FF7200";
                        }else if(yl>96){
                            c = "#FFFF1F";
                        }
                        }
                        return {color: c, opacity: o, weight: 3};
                    },
                    renderer:L.canvas()
                    });
                    break;
                case 30:    //管道流量
                    path = esri.crsfeatureLayer({
                    url: prefix + PipeResult,
                    style: function (feature) {
                        var c,o=1,yl = feature.properties.Result_AbsoluteFlow_0;
                        if(yl==null){
                        c = "#fff";
                        o = 0;
                        }else{
                        if(yl<=50){
                            c = "#FF3643";
                        }else if(yl>50&&yl<=100){
                            c = "#17B2E5";
                        }else if(yl>100&&yl<=200){
                            c = "#8aff00";
                        }else if(yl>200&&yl<=500){
                            c = "#FF7200";
                        }else if(yl>500){
                            c = "#FFFF1F";
                        }
                        }
                        return {color: c, opacity: o, weight: 3};
                    },
                    renderer:L.canvas()
                    });
                    break;
                default:
                    console.error();
                break;
            }
            self['gw'+index] = path?path:esri.dynamicMapLayer({
                url: oriUrl,
                opacity : 0.8,//0.25,
                useCors: false,
                f:"image",
                format:'png8'
            });
        },
        toggleGuanxianI(index,boolean){
            let self = this;
            if(self['gw'+index]){
                if(boolean){
                    self.map.hasLayer(self['gw'+index])?'':self['gw'+index].addTo(self.map);
                }
                else{
                    self.map.hasLayer(self['gw'+index])?self.map.removeLayer(self['gw'+index]):'';
                }
            }
            if(index==22){
                this.pssyLayer.clearLayers();
                this.map.closePopup();
            }
        },
        customFeatureLayer(){
            let self= this;
            L.crsfeatureLayer = esri.FeatureLayer.extend({
                initialize: function (options) {
                    esri.FeatureLayer.prototype.initialize.call(this, options)
                },
                _requestFeatures: function(t, i, s) {
                    var e = L;
                    var northEast = this._map.options.crs.project(t.getNorthEast()),
                    southWest = this._map.options.crs.project(t.getSouthWest());
                    t._northEast.lat = northEast.y;
                    t._northEast.lng = northEast.x;
                    t._southWest.lat = southWest.y;
                    t._southWest.lng = southWest.x;
                    return this._activeRequests++, 1 === this._activeRequests && this.fire("loading", {
                    bounds: t
                    }, !0), this._buildQuery(t).run(function(r, n, o) {
                    o && o.exceededTransferLimit && this.fire("drawlimitexceeded"), !r && n && n.features.length && e.Util.requestAnimFrame(e.Util.bind(function() {
                    this._addFeatures(n.features, i), this._postProcessFeatures(t)
                    }, this)), r || !n || n.features.length || this._postProcessFeatures(t), r && this._postProcessFeatures(t), s && s.call(this, r, n)
                    }, this)
                },
                _addFeatures: function(t, e) {
                    for(var i=0;i<t.length;i++){
                        var c = t[i].geometry.coordinates,coords = [];
                        if(t[i].geometry.type=="Point"){
                            coords = proj4(self.projStr).inverse(c);
                        }
                        else{
                            for(var j=0;j<c.length;j++){
                                coords.push(
                                proj4(self.projStr).inverse(c[j])
                                );
                            }
                        }
                        t[i].geometry.coordinates = coords;
                    }
                    i = this._cacheKey(e);
                    this._cache[i] = this._cache[i] || [];
                    for (var s = t.length - 1; s >= 0; s--) {
                    var r = t[s].id;
                    this._currentSnapshot.indexOf(r) === -1 && this._currentSnapshot.push(r), this._cache[i].indexOf(r) === -1 && this._cache[i].push(r)
                    }
                    this.options.timeField && this._buildTimeIndexes(t), this.createLayers(t)
                }
            });
            esri.crsfeatureLayer = function (options) {
                return new L.crsfeatureLayer(options);
            };
        }
        },
        mounted(){ 
            this.tms_init();
            this.map_init();
    
            this.customFeatureLayer();
            for (let k = 2;k<=2;k++){
                this.initGuanxianI(k);
            }
            this.toggleGuanxianI(2,true);
            let map = this.map;
            let self = this;
            map.on('click',function(e){
                var latlng = e.latlng;
                self["gw2"].identify()
                .on(map)
                .at(latlng)
                .run(
                    function(error, featureCollection){  //  debugger;
                        var data = featureCollection.features.reverse();
                        console.log(data);
                        if(data.length>0){
                            debugger;
                        }
                    }
                );
            })
        }
    })
      
      
});
