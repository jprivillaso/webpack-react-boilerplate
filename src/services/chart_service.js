import RestService from '~utils/rest_api';

const RestApi = new RestService();

export const fetchMeterDataService = (meterCode, curveType) => {
  const URL = `api/core/meters/getMeterResultsByPointType?meterCode=${meterCode}&startTime=1483236000000&endTime=1488423540000&aggregation=d&curves=${curveType}`;

  return RestApi.get(URL, {}).then(response => {
    return {
      data: response[curveType].chartData
    };
  })
    .catch(error => {
      throw error;
    });
};

export const fetchWidgetDefinitionService = (widgetType) => {
  // Fetch widget definition, models, links and events
  const WIDGET_DEF_URL = `api/tx/infoboard/dashboards/widgets/widgetDef/${widgetType}?objects=viewContents`;

  return RestApi.get(WIDGET_DEF_URL, {}).then((response) => {
    return response[widgetType];
  });
};

export const fetchWidgetObjectsService = (widgetId) => {
  const WIDGET_OBJECTS_URL = `api/tx/infoboard/dashboards/widgets/${widgetId}?objects=DASHBOARD_WIDGET_LINK,DASHBOARD_WIDGET_MODEL`;

  return RestApi.get(WIDGET_OBJECTS_URL, {}).then((response) => {
    return response;
  });
};

export const fetchWidgetListService = (dashboardId) => {
  const URL = `api/tx/infoboard/dashboards/${dashboardId}?objects=DASHBOARD_WIDGETS`;

  return RestApi.get(URL, {}).then((response) => {
    return response;
  });
};
