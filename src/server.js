export const PUBLIC_SERVER="https://cabin-routing-dame-sciences.trycloudflare.com";
export const HOME_SERVER=PUBLIC_SERVER;
export const IPV6_SERVER=PUBLIC_SERVER;
export const getServerOrigin=()=>PUBLIC_SERVER;
export async function fetchAccountServer(path,options,{fetcher=fetch,timeout=15000}={}){if(!/^\/api\/account\/[A-Za-z0-9%/_-]+$/.test(path))throw Error('账号服务器路径无效');return fetcher(PUBLIC_SERVER+path,{...options,signal:options.signal?AbortSignal.any([options.signal,AbortSignal.timeout(timeout)]):AbortSignal.timeout(timeout)});}
