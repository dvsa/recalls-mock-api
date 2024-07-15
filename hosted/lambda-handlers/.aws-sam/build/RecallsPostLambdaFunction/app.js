(()=>{var e={579:(e,t,E)=>{"use strict";E.r(t),E.d(t,{ACCEPTED:()=>r,BAD_GATEWAY:()=>n,BAD_REQUEST:()=>a,CONFLICT:()=>o,CONTINUE:()=>i,CREATED:()=>s,EXPECTATION_FAILED:()=>T,FAILED_DEPENDENCY:()=>R,FORBIDDEN:()=>_,GATEWAY_TIMEOUT:()=>N,GONE:()=>O,HTTP_VERSION_NOT_SUPPORTED:()=>I,IM_A_TEAPOT:()=>c,INSUFFICIENT_SPACE_ON_RESOURCE:()=>d,INSUFFICIENT_STORAGE:()=>u,INTERNAL_SERVER_ERROR:()=>l,LENGTH_REQUIRED:()=>A,LOCKED:()=>D,METHOD_FAILURE:()=>p,METHOD_NOT_ALLOWED:()=>S,MOVED_PERMANENTLY:()=>C,MOVED_TEMPORARILY:()=>U,MULTIPLE_CHOICES:()=>L,MULTI_STATUS:()=>f,NETWORK_AUTHENTICATION_REQUIRED:()=>P,NON_AUTHORITATIVE_INFORMATION:()=>g,NOT_ACCEPTABLE:()=>M,NOT_FOUND:()=>F,NOT_IMPLEMENTED:()=>m,NOT_MODIFIED:()=>y,NO_CONTENT:()=>v,OK:()=>h,PARTIAL_CONTENT:()=>V,PAYMENT_REQUIRED:()=>Y,PERMANENT_REDIRECT:()=>G,PRECONDITION_FAILED:()=>H,PRECONDITION_REQUIRED:()=>B,PROCESSING:()=>b,PROXY_AUTHENTICATION_REQUIRED:()=>Q,REQUESTED_RANGE_NOT_SATISFIABLE:()=>j,REQUEST_HEADER_FIELDS_TOO_LARGE:()=>q,REQUEST_TIMEOUT:()=>w,REQUEST_TOO_LONG:()=>x,REQUEST_URI_TOO_LONG:()=>K,RESET_CONTENT:()=>W,ReasonPhrases:()=>Te,SEE_OTHER:()=>k,SERVICE_UNAVAILABLE:()=>$,SWITCHING_PROTOCOLS:()=>X,StatusCodes:()=>se,TEMPORARY_REDIRECT:()=>Z,TOO_MANY_REQUESTS:()=>z,UNAUTHORIZED:()=>J,UNPROCESSABLE_ENTITY:()=>ee,UNSUPPORTED_MEDIA_TYPE:()=>te,USE_PROXY:()=>Ee,default:()=>Ne,getReasonPhrase:()=>oe,getStatusCode:()=>ie,getStatusText:()=>Re});var r=202,n=502,a=400,o=409,i=100,s=201,T=417,R=424,_=403,N=504,O=410,I=505,c=418,d=419,u=507,l=500,A=411,D=423,p=420,S=405,C=301,U=302,f=207,L=300,P=511,v=204,g=203,M=406,F=404,m=501,y=304,h=200,V=206,Y=402,G=308,H=412,B=428,b=102,Q=407,q=431,w=408,x=413,K=414,j=416,W=205,k=303,$=503,X=101,Z=307,z=429,J=401,ee=422,te=415,Ee=305;const re={ACCEPTED:r,BAD_GATEWAY:n,BAD_REQUEST:a,CONFLICT:o,CONTINUE:i,CREATED:s,EXPECTATION_FAILED:T,FORBIDDEN:_,GATEWAY_TIMEOUT:N,GONE:O,HTTP_VERSION_NOT_SUPPORTED:I,IM_A_TEAPOT:c,INSUFFICIENT_SPACE_ON_RESOURCE:d,INSUFFICIENT_STORAGE:u,INTERNAL_SERVER_ERROR:l,LENGTH_REQUIRED:A,LOCKED:D,METHOD_FAILURE:p,METHOD_NOT_ALLOWED:S,MOVED_PERMANENTLY:C,MOVED_TEMPORARILY:U,MULTI_STATUS:f,MULTIPLE_CHOICES:L,NETWORK_AUTHENTICATION_REQUIRED:P,NO_CONTENT:v,NON_AUTHORITATIVE_INFORMATION:g,NOT_ACCEPTABLE:M,NOT_FOUND:F,NOT_IMPLEMENTED:m,NOT_MODIFIED:y,OK:h,PARTIAL_CONTENT:V,PAYMENT_REQUIRED:Y,PERMANENT_REDIRECT:G,PRECONDITION_FAILED:H,PRECONDITION_REQUIRED:B,PROCESSING:b,PROXY_AUTHENTICATION_REQUIRED:Q,REQUEST_HEADER_FIELDS_TOO_LARGE:q,REQUEST_TIMEOUT:w,REQUEST_TOO_LONG:x,REQUEST_URI_TOO_LONG:K,REQUESTED_RANGE_NOT_SATISFIABLE:j,RESET_CONTENT:W,SEE_OTHER:k,SERVICE_UNAVAILABLE:$,SWITCHING_PROTOCOLS:X,TEMPORARY_REDIRECT:Z,TOO_MANY_REQUESTS:z,UNAUTHORIZED:J,UNPROCESSABLE_ENTITY:ee,UNSUPPORTED_MEDIA_TYPE:te,USE_PROXY:Ee};var ne={202:"Accepted",502:"Bad Gateway",400:"Bad Request",409:"Conflict",100:"Continue",201:"Created",417:"Expectation Failed",424:"Failed Dependency",403:"Forbidden",504:"Gateway Timeout",410:"Gone",505:"HTTP Version Not Supported",418:"I'm a teapot",419:"Insufficient Space on Resource",507:"Insufficient Storage",500:"Internal Server Error",411:"Length Required",423:"Locked",420:"Method Failure",405:"Method Not Allowed",301:"Moved Permanently",302:"Moved Temporarily",207:"Multi-Status",300:"Multiple Choices",511:"Network Authentication Required",204:"No Content",203:"Non Authoritative Information",406:"Not Acceptable",404:"Not Found",501:"Not Implemented",304:"Not Modified",200:"OK",206:"Partial Content",402:"Payment Required",308:"Permanent Redirect",412:"Precondition Failed",428:"Precondition Required",102:"Processing",103:"Early Hints",426:"Upgrade Required",407:"Proxy Authentication Required",431:"Request Header Fields Too Large",408:"Request Timeout",413:"Request Entity Too Large",414:"Request-URI Too Long",416:"Requested Range Not Satisfiable",205:"Reset Content",303:"See Other",503:"Service Unavailable",101:"Switching Protocols",307:"Temporary Redirect",429:"Too Many Requests",401:"Unauthorized",451:"Unavailable For Legal Reasons",422:"Unprocessable Entity",415:"Unsupported Media Type",305:"Use Proxy",421:"Misdirected Request"},ae={Accepted:202,"Bad Gateway":502,"Bad Request":400,Conflict:409,Continue:100,Created:201,"Expectation Failed":417,"Failed Dependency":424,Forbidden:403,"Gateway Timeout":504,Gone:410,"HTTP Version Not Supported":505,"I'm a teapot":418,"Insufficient Space on Resource":419,"Insufficient Storage":507,"Internal Server Error":500,"Length Required":411,Locked:423,"Method Failure":420,"Method Not Allowed":405,"Moved Permanently":301,"Moved Temporarily":302,"Multi-Status":207,"Multiple Choices":300,"Network Authentication Required":511,"No Content":204,"Non Authoritative Information":203,"Not Acceptable":406,"Not Found":404,"Not Implemented":501,"Not Modified":304,OK:200,"Partial Content":206,"Payment Required":402,"Permanent Redirect":308,"Precondition Failed":412,"Precondition Required":428,Processing:102,"Early Hints":103,"Upgrade Required":426,"Proxy Authentication Required":407,"Request Header Fields Too Large":431,"Request Timeout":408,"Request Entity Too Large":413,"Request-URI Too Long":414,"Requested Range Not Satisfiable":416,"Reset Content":205,"See Other":303,"Service Unavailable":503,"Switching Protocols":101,"Temporary Redirect":307,"Too Many Requests":429,Unauthorized:401,"Unavailable For Legal Reasons":451,"Unprocessable Entity":422,"Unsupported Media Type":415,"Use Proxy":305,"Misdirected Request":421};function oe(e){var t=ne[e.toString()];if(!t)throw new Error("Status code does not exist: "+e);return t}function ie(e){var t=ae[e];if(!t)throw new Error("Reason phrase does not exist: "+e);return t}var se,Te,Re=oe;!function(e){e[e.CONTINUE=100]="CONTINUE",e[e.SWITCHING_PROTOCOLS=101]="SWITCHING_PROTOCOLS",e[e.PROCESSING=102]="PROCESSING",e[e.EARLY_HINTS=103]="EARLY_HINTS",e[e.OK=200]="OK",e[e.CREATED=201]="CREATED",e[e.ACCEPTED=202]="ACCEPTED",e[e.NON_AUTHORITATIVE_INFORMATION=203]="NON_AUTHORITATIVE_INFORMATION",e[e.NO_CONTENT=204]="NO_CONTENT",e[e.RESET_CONTENT=205]="RESET_CONTENT",e[e.PARTIAL_CONTENT=206]="PARTIAL_CONTENT",e[e.MULTI_STATUS=207]="MULTI_STATUS",e[e.MULTIPLE_CHOICES=300]="MULTIPLE_CHOICES",e[e.MOVED_PERMANENTLY=301]="MOVED_PERMANENTLY",e[e.MOVED_TEMPORARILY=302]="MOVED_TEMPORARILY",e[e.SEE_OTHER=303]="SEE_OTHER",e[e.NOT_MODIFIED=304]="NOT_MODIFIED",e[e.USE_PROXY=305]="USE_PROXY",e[e.TEMPORARY_REDIRECT=307]="TEMPORARY_REDIRECT",e[e.PERMANENT_REDIRECT=308]="PERMANENT_REDIRECT",e[e.BAD_REQUEST=400]="BAD_REQUEST",e[e.UNAUTHORIZED=401]="UNAUTHORIZED",e[e.PAYMENT_REQUIRED=402]="PAYMENT_REQUIRED",e[e.FORBIDDEN=403]="FORBIDDEN",e[e.NOT_FOUND=404]="NOT_FOUND",e[e.METHOD_NOT_ALLOWED=405]="METHOD_NOT_ALLOWED",e[e.NOT_ACCEPTABLE=406]="NOT_ACCEPTABLE",e[e.PROXY_AUTHENTICATION_REQUIRED=407]="PROXY_AUTHENTICATION_REQUIRED",e[e.REQUEST_TIMEOUT=408]="REQUEST_TIMEOUT",e[e.CONFLICT=409]="CONFLICT",e[e.GONE=410]="GONE",e[e.LENGTH_REQUIRED=411]="LENGTH_REQUIRED",e[e.PRECONDITION_FAILED=412]="PRECONDITION_FAILED",e[e.REQUEST_TOO_LONG=413]="REQUEST_TOO_LONG",e[e.REQUEST_URI_TOO_LONG=414]="REQUEST_URI_TOO_LONG",e[e.UNSUPPORTED_MEDIA_TYPE=415]="UNSUPPORTED_MEDIA_TYPE",e[e.REQUESTED_RANGE_NOT_SATISFIABLE=416]="REQUESTED_RANGE_NOT_SATISFIABLE",e[e.EXPECTATION_FAILED=417]="EXPECTATION_FAILED",e[e.IM_A_TEAPOT=418]="IM_A_TEAPOT",e[e.INSUFFICIENT_SPACE_ON_RESOURCE=419]="INSUFFICIENT_SPACE_ON_RESOURCE",e[e.METHOD_FAILURE=420]="METHOD_FAILURE",e[e.MISDIRECTED_REQUEST=421]="MISDIRECTED_REQUEST",e[e.UNPROCESSABLE_ENTITY=422]="UNPROCESSABLE_ENTITY",e[e.LOCKED=423]="LOCKED",e[e.FAILED_DEPENDENCY=424]="FAILED_DEPENDENCY",e[e.UPGRADE_REQUIRED=426]="UPGRADE_REQUIRED",e[e.PRECONDITION_REQUIRED=428]="PRECONDITION_REQUIRED",e[e.TOO_MANY_REQUESTS=429]="TOO_MANY_REQUESTS",e[e.REQUEST_HEADER_FIELDS_TOO_LARGE=431]="REQUEST_HEADER_FIELDS_TOO_LARGE",e[e.UNAVAILABLE_FOR_LEGAL_REASONS=451]="UNAVAILABLE_FOR_LEGAL_REASONS",e[e.INTERNAL_SERVER_ERROR=500]="INTERNAL_SERVER_ERROR",e[e.NOT_IMPLEMENTED=501]="NOT_IMPLEMENTED",e[e.BAD_GATEWAY=502]="BAD_GATEWAY",e[e.SERVICE_UNAVAILABLE=503]="SERVICE_UNAVAILABLE",e[e.GATEWAY_TIMEOUT=504]="GATEWAY_TIMEOUT",e[e.HTTP_VERSION_NOT_SUPPORTED=505]="HTTP_VERSION_NOT_SUPPORTED",e[e.INSUFFICIENT_STORAGE=507]="INSUFFICIENT_STORAGE",e[e.NETWORK_AUTHENTICATION_REQUIRED=511]="NETWORK_AUTHENTICATION_REQUIRED"}(se||(se={})),function(e){e.ACCEPTED="Accepted",e.BAD_GATEWAY="Bad Gateway",e.BAD_REQUEST="Bad Request",e.CONFLICT="Conflict",e.CONTINUE="Continue",e.CREATED="Created",e.EXPECTATION_FAILED="Expectation Failed",e.FAILED_DEPENDENCY="Failed Dependency",e.FORBIDDEN="Forbidden",e.GATEWAY_TIMEOUT="Gateway Timeout",e.GONE="Gone",e.HTTP_VERSION_NOT_SUPPORTED="HTTP Version Not Supported",e.IM_A_TEAPOT="I'm a teapot",e.INSUFFICIENT_SPACE_ON_RESOURCE="Insufficient Space on Resource",e.INSUFFICIENT_STORAGE="Insufficient Storage",e.INTERNAL_SERVER_ERROR="Internal Server Error",e.LENGTH_REQUIRED="Length Required",e.LOCKED="Locked",e.METHOD_FAILURE="Method Failure",e.METHOD_NOT_ALLOWED="Method Not Allowed",e.MOVED_PERMANENTLY="Moved Permanently",e.MOVED_TEMPORARILY="Moved Temporarily",e.MULTI_STATUS="Multi-Status",e.MULTIPLE_CHOICES="Multiple Choices",e.NETWORK_AUTHENTICATION_REQUIRED="Network Authentication Required",e.NO_CONTENT="No Content",e.NON_AUTHORITATIVE_INFORMATION="Non Authoritative Information",e.NOT_ACCEPTABLE="Not Acceptable",e.NOT_FOUND="Not Found",e.NOT_IMPLEMENTED="Not Implemented",e.NOT_MODIFIED="Not Modified",e.OK="OK",e.PARTIAL_CONTENT="Partial Content",e.PAYMENT_REQUIRED="Payment Required",e.PERMANENT_REDIRECT="Permanent Redirect",e.PRECONDITION_FAILED="Precondition Failed",e.PRECONDITION_REQUIRED="Precondition Required",e.PROCESSING="Processing",e.EARLY_HINTS="Early Hints",e.UPGRADE_REQUIRED="Upgrade Required",e.PROXY_AUTHENTICATION_REQUIRED="Proxy Authentication Required",e.REQUEST_HEADER_FIELDS_TOO_LARGE="Request Header Fields Too Large",e.REQUEST_TIMEOUT="Request Timeout",e.REQUEST_TOO_LONG="Request Entity Too Large",e.REQUEST_URI_TOO_LONG="Request-URI Too Long",e.REQUESTED_RANGE_NOT_SATISFIABLE="Requested Range Not Satisfiable",e.RESET_CONTENT="Reset Content",e.SEE_OTHER="See Other",e.SERVICE_UNAVAILABLE="Service Unavailable",e.SWITCHING_PROTOCOLS="Switching Protocols",e.TEMPORARY_REDIRECT="Temporary Redirect",e.TOO_MANY_REQUESTS="Too Many Requests",e.UNAUTHORIZED="Unauthorized",e.UNAVAILABLE_FOR_LEGAL_REASONS="Unavailable For Legal Reasons",e.UNPROCESSABLE_ENTITY="Unprocessable Entity",e.UNSUPPORTED_MEDIA_TYPE="Unsupported Media Type",e.USE_PROXY="Use Proxy",e.MISDIRECTED_REQUEST="Misdirected Request"}(Te||(Te={}));var _e=function(){return _e=Object.assign||function(e){for(var t,E=1,r=arguments.length;E<r;E++)for(var n in t=arguments[E])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},_e.apply(this,arguments)};const Ne=_e(_e({},re),{getStatusCode:ie,getStatusText:Re})},784:(e,t,E)=>{E(599).config(Object.assign({},E(900),E(845)(process.argv)))},845:e=>{const t=/^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;e.exports=function(e){return e.reduce((function(e,E){const r=E.match(t);return r&&(e[r[1]]=r[2]),e}),{})}},900:e=>{const t={};null!=process.env.DOTENV_CONFIG_ENCODING&&(t.encoding=process.env.DOTENV_CONFIG_ENCODING),null!=process.env.DOTENV_CONFIG_PATH&&(t.path=process.env.DOTENV_CONFIG_PATH),null!=process.env.DOTENV_CONFIG_DEBUG&&(t.debug=process.env.DOTENV_CONFIG_DEBUG),null!=process.env.DOTENV_CONFIG_OVERRIDE&&(t.override=process.env.DOTENV_CONFIG_OVERRIDE),null!=process.env.DOTENV_CONFIG_DOTENV_KEY&&(t.DOTENV_KEY=process.env.DOTENV_CONFIG_DOTENV_KEY),e.exports=t},599:(e,t,E)=>{const r=E(896),n=E(928),a=E(857),o=E(982),i=E(583).version,s=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function T(e){console.log(`[dotenv@${i}][DEBUG] ${e}`)}function R(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function _(e,t){let E;try{E=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code){const e=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw e.code="INVALID_DOTENV_KEY",e}throw e}const r=E.password;if(!r){const e=new Error("INVALID_DOTENV_KEY: Missing key part");throw e.code="INVALID_DOTENV_KEY",e}const n=E.searchParams.get("environment");if(!n){const e=new Error("INVALID_DOTENV_KEY: Missing environment part");throw e.code="INVALID_DOTENV_KEY",e}const a=`DOTENV_VAULT_${n.toUpperCase()}`,o=e.parsed[a];if(!o){const e=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${a} in your .env.vault file.`);throw e.code="NOT_FOUND_DOTENV_ENVIRONMENT",e}return{ciphertext:o,key:r}}function N(e){let t=null;if(e&&e.path&&e.path.length>0)if(Array.isArray(e.path))for(const E of e.path)r.existsSync(E)&&(t=E.endsWith(".vault")?E:`${E}.vault`);else t=e.path.endsWith(".vault")?e.path:`${e.path}.vault`;else t=n.resolve(process.cwd(),".env.vault");return r.existsSync(t)?t:null}function O(e){return"~"===e[0]?n.join(a.homedir(),e.slice(1)):e}const I={configDotenv:function(e){const t=n.resolve(process.cwd(),".env");let E="utf8";const a=Boolean(e&&e.debug);e&&e.encoding?E=e.encoding:a&&T("No encoding is specified. UTF-8 is used by default");let o,i=[t];if(e&&e.path)if(Array.isArray(e.path)){i=[];for(const t of e.path)i.push(O(t))}else i=[O(e.path)];const s={};for(const t of i)try{const n=I.parse(r.readFileSync(t,{encoding:E}));I.populate(s,n,e)}catch(e){a&&T(`Failed to load ${t} ${e.message}`),o=e}let R=process.env;return e&&null!=e.processEnv&&(R=e.processEnv),I.populate(R,s,e),o?{parsed:s,error:o}:{parsed:s}},_configVault:function(e){var t;t="Loading env from encrypted .env.vault",console.log(`[dotenv@${i}][INFO] ${t}`);const E=I._parseVault(e);let r=process.env;return e&&null!=e.processEnv&&(r=e.processEnv),I.populate(r,E,e),{parsed:E}},_parseVault:function(e){const t=N(e),E=I.configDotenv({path:t});if(!E.parsed){const e=new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);throw e.code="MISSING_DATA",e}const r=R(e).split(","),n=r.length;let a;for(let e=0;e<n;e++)try{const t=_(E,r[e].trim());a=I.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=n)throw t}return I.parse(a)},config:function(e){if(0===R(e).length)return I.configDotenv(e);const t=N(e);return t?I._configVault(e):(E=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${i}][WARN] ${E}`),I.configDotenv(e));var E},decrypt:function(e,t){const E=Buffer.from(t.slice(-64),"hex");let r=Buffer.from(e,"base64");const n=r.subarray(0,12),a=r.subarray(-16);r=r.subarray(12,-16);try{const e=o.createDecipheriv("aes-256-gcm",E,n);return e.setAuthTag(a),`${e.update(r)}${e.final()}`}catch(e){const t=e instanceof RangeError,E="Invalid key length"===e.message,r="Unsupported state or unable to authenticate data"===e.message;if(t||E){const e=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw e.code="INVALID_DOTENV_KEY",e}if(r){const e=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw e.code="DECRYPTION_FAILED",e}throw e}},parse:function(e){const t={};let E,r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(E=s.exec(r));){const e=E[1];let r=E[2]||"";r=r.trim();const n=r[0];r=r.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===n&&(r=r.replace(/\\n/g,"\n"),r=r.replace(/\\r/g,"\r")),t[e]=r}return t},populate:function(e,t,E={}){const r=Boolean(E&&E.debug),n=Boolean(E&&E.override);if("object"!=typeof t){const e=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw e.code="OBJECT_REQUIRED",e}for(const E of Object.keys(t))Object.prototype.hasOwnProperty.call(e,E)?(!0===n&&(e[E]=t[E]),r&&T(!0===n?`"${E}" is already defined and WAS overwritten`:`"${E}" is already defined and was NOT overwritten`)):e[E]=t[E]}};e.exports.configDotenv=I.configDotenv,e.exports._configVault=I._configVault,e.exports._parseVault=I._parseVault,e.exports.config=I.config,e.exports.decrypt=I.decrypt,e.exports.parse=I.parse,e.exports.populate=I.populate,e.exports=I},341:(e,t,E)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=E(751),n=[{vin:"ABCD122CBAD11432",manufacturerCampaignReference:"12AB12",dvsaCampaignReference:"R/2022/001",recallCampaignStartDate:"2004-12-04",manufacturerId:"manufacturer",repairStatus:r.RepairStatus.FIXED},{vin:"ABCD122CBAD11433",manufacturerCampaignReference:"12AB13",dvsaCampaignReference:"R/2022/002",recallCampaignStartDate:"2005-01-02",manufacturerId:"manufacturer",repairStatus:r.RepairStatus.NOT_FIXED},{vin:"ABCD122CBAD11433",manufacturerCampaignReference:"12AB14",dvsaCampaignReference:"R/2022/004",recallCampaignStartDate:"2006-01-02",manufacturerId:"manufacturer",repairStatus:r.RepairStatus.NOT_FIXED}];t.default=n},106:function(e,t,E){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.handler=void 0,E(784);const n=E(579),a=r(E(110)),o=E(547),i=r(E(528)),s=r(E(341)),T=r(E(431)),R=r(E(810)),_=E(812),N=r(E(404)),O=E(464),I=r(E(431));t.handler=async e=>{if(!(0,i.default)(e.headers))return(0,O.HttpErrorResponse)(n.StatusCodes.UNAUTHORIZED,N.default.UNAUTHORIZED,I.default.UNAUTHORIZED);if(!(0,R.default)(e.headers))return(0,O.HttpErrorResponse)(n.StatusCodes.FORBIDDEN,N.default.FORBIDDEN,I.default.UNRECOGNIZED_API_KEY);if(!e.body)return(0,O.HttpErrorResponse)(n.StatusCodes.BAD_REQUEST,N.default.BAD_REQUEST,T.default.InvalidRequestBody);let t;try{if(t=JSON.parse(e.body),!(0,o.allRequiredFieldsCreateRecall)(t))return(0,O.HttpErrorResponse)(n.StatusCodes.BAD_REQUEST,N.default.BAD_REQUEST,T.default.InvalidRequestBody);if(!(0,o.validDateFormat)(t.recallCampaignStartDate))return(0,O.HttpErrorResponse)(n.StatusCodes.BAD_REQUEST,N.default.BAD_REQUEST,T.default.InvalidDateFormat);const E=s.default.find((e=>e.vin===t.vin));return E?(0,O.HttpErrorResponse)(n.StatusCodes.CONFLICT,N.default.CONFLICT,d(E)):(0,a.default)(n.StatusCodes.CREATED,c(t))}catch(e){return(0,O.HttpErrorResponse)(n.StatusCodes.BAD_REQUEST,N.default.BAD_REQUEST,T.default.InvalidRequestBody)}};const c=e=>{const t={},E={};return E.vin=e.vin,E.manufacturerCampaignReference=e.manufacturerCampaignReference,E.dvsaCampaignReference=e.dvsaCampaignReference,E.recallCampaignStartDate=(0,_.createDate)(),t.manufacturer="mock_api_user",t.recall=E,t},d=e=>`Vehicle already registered with VIN: ${e.vin} and DvsaCampaignReference: ${e.dvsaCampaignReference}`},464:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HttpErrorResponse=void 0;t.HttpErrorResponse=(e,t,E)=>({statusCode:e,body:JSON.stringify({requestId:"id1234",errorCode:t,errorMessage:E})})},110:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=(e,t)=>({statusCode:e,body:JSON.stringify(t)})},812:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createDate=void 0;t.createDate=()=>(new Date).toISOString()},404:(e,t)=>{"use strict";var E;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.BAD_REQUEST="RECALLS-BR-01",e.UNAUTHORIZED="RECALLS-UA-01",e.FORBIDDEN="RECALLS-FB-01",e.TOKEN_EXPIRED="RECALLS-FB-02",e.UNRECOGNIZED_API_KEY="RECALLS-FB-03",e.MISSING_TOKEN="RECALLS-FB-04",e.USAGE_EXCEEDED="RECALLS-RL-01",e.TOO_MANY_REQUESTS="RECALLS-RL-02",e.URL_NOT_FOUND="RECALLS-NF-02",e.NO_DATA_FOUND="RECALLS-NF-01",e.CLIENT_SECRET_LIMIT_REACHED="RECALLS-PC-01",e.CONFLICT="RECALLS-CF-01",e.UNKNOWN="RECALLS-UN-01"}(E||(E={})),t.default=E},431:(e,t)=>{"use strict";var E;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.InvalidRequestBody="Invalid request body",e.VinParameterMissing="VIN is required",e.DvsaCampaignReferenceParamMissing="DVSA campaign reference is required",e.ManufacturerCampaignReferenceParamMissing="Manufacturer campaign reference is required",e.DvsaAndManufacturerCampaignReferenceMissing="Required dvsaCampaignReference and/or manufacturerCampaignReference parameter is missing",e.DvsaCampaignReferenceInvalid="Invalid dvsa campaign reference number",e.VehicleRecallAlreadyFixed="Vehicle recall has already been marked as fixed",e.VehicleRecallAlreadyNotFixed="Vehicle recall has already been marked as not fixed",e.InvalidDateFormat="Date must be in the format YYYY-MM-DD",e.InvalidRectificationDate="Recall rectification date cannot be before recall campaign start date",e.BAD_REQUEST="Something is wrong with the request",e.UNAUTHORIZED="Your authorisation failed",e.UNRECOGNIZED_API_KEY="Your API key is invalid",e.FORBIDDEN="You do not have permission to access this"}(E||(E={})),t.default=E},751:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RepairStatus=void 0,function(e){e.NOT_FIXED="NOT_FIXED",e.FIXED="FIXED"}(t.RepairStatus||(t.RepairStatus={}))},810:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const E=new RegExp(/^.{10,}$/);t.default=e=>null!=e["x-api-key"]&&E.test(e["x-api-key"])},528:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const E=new RegExp(/^Bearer\s.{12,}/);t.default=e=>null!=e.authorization&&E.test(e.authorization)},547:(e,t,E)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.rectificationDateIsInvalid=t.allRequiredFieldsUpdateFixedRecall=t.allRequiredFieldsUpdateNonfixedRecall=t.allRequiredFieldsCreateRecall=t.alreadyRepaired=t.validVinFormat=t.validDateFormat=t.validDvsaCampaignReference=void 0;const r=E(751),n=new RegExp(/^[a-zA-Z]+\/[0-9]{4}\/[0-9]{3}/),a=new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/),o=new RegExp(/^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/);t.validDvsaCampaignReference=e=>n.test(e);t.validDateFormat=e=>a.test(e);t.validVinFormat=e=>o.test(e);t.alreadyRepaired=e=>e.repairStatus===r.RepairStatus.FIXED;t.allRequiredFieldsCreateRecall=e=>i(e.vin)&&i(e.manufacturerCampaignReference)&&i(e.dvsaCampaignReference)&&i(e.recallCampaignStartDate);t.allRequiredFieldsUpdateNonfixedRecall=e=>i(e.rectificationDate)&&i(e.repairStatus);t.allRequiredFieldsUpdateFixedRecall=e=>i(e.repairStatus);t.rectificationDateIsInvalid=(e,t)=>{const E=new Date(t);return new Date(e)<E};const i=e=>null!=e&&e.length>0},982:e=>{"use strict";e.exports=require("crypto")},896:e=>{"use strict";e.exports=require("fs")},857:e=>{"use strict";e.exports=require("os")},928:e=>{"use strict";e.exports=require("path")},583:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.4.5","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","test:coverage":"tap --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},t={};function E(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,E),a.exports}E.d=(e,t)=>{for(var r in t)E.o(t,r)&&!E.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},E.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),E.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r=E(106);module.exports=r})();