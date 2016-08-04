namespace jfc {


    export interface IRoute {
        url: string;
        config: IRouteConfig;
    }

    export interface IRouteConfig {
        title: string;
        controller: string;
        controllerAs: string;
        templateUrl: string;
        displayName: string;
        claim: string;
        settings?: IConfigSetting;
    }

    export interface IConfigSetting {
        nav?: number;
        level?: number;
        parent?: string;
        displayName?: string;
        displayIcon?: string;
    }
}
