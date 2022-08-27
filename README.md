# cf-worker-vue-stream

> Vuejs TransformStream Server Side Rendering Cloudflare Worker

🚨 Wrangler `assets` fields are experimental.


### Cloudflare’s Early Hints

- Sign in to your Cloudflare Account
- In the dashboard, navigate to [Speed tab](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization#sxg-card)
- Click on the Optimization section



```bash
curl url -I https://transformstream.dlbr.dev/
HTTP/2 103 
link: </inter.woff2>; as=font; crossorigin; rel=preload, </assets/vendor.74894c8f.js>; as=script; crossorigin; rel=preload, </assets/Index.e1c90fc8.js>; as=script; crossorigin; rel=preload, </assets/Index.ed2abc71.css>; as=style; rel=preload

HTTP/2 200 
date: Sat, 27 Aug 2022 07:59:39 GMT
content-type: text/html;charset=UTF-8
cache-control: no-cache
...
```

[DEMO](https://transformstream.dlbr.dev)
