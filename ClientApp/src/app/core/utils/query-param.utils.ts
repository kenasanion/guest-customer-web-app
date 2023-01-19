import { ActivatedRoute, ParamMap, Router } from "@angular/router";

export class QueryParamUtils {

  public static removeParamFromUrl(router: Router, activatedRoute: ActivatedRoute, paramMap: ParamMap, keysToRemove: string[]): void {
    const queryParams: any = {};
    const keysToKeep = paramMap.keys.filter(k => !keysToRemove.includes(k));
    keysToKeep.forEach(k => (queryParams[k] = paramMap.get(k)));

    router.navigate([], { queryParams, replaceUrl: true, relativeTo: activatedRoute });
  }

}
