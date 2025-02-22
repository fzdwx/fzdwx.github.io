---
title: Go client 如何自定义 dns 解析以及跳过 https 证书验证
date: 2024-11-08 09:50:19
tags: [ go ]
---

```go
var (
    dialer = &net.Dialer{}
)

type DnsOverride struct {
	Domain string `json:"domain"`
	Ip     string `json:"ip"`
}

func newTr(overrides []DnsOverride, skipTlsVerify bool) *http.Transport {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: skipTlsVerify},
	}
	if len(overrides) == 0 {
		return tr
	}

	tr.DialContext = func(ctx context.Context, network, addr string) (net.Conn, error) {
		host, port, err := net.SplitHostPort(addr)
		if err != nil {
			return dialer.DialContext(ctx, network, addr)
		}

		for _, override := range overrides {
			if host == override.Domain {
				addr = override.Ip + ":" + port
				break
			}
		}

		return dialer.DialContext(ctx, network, addr)
	}

	return tr
}
```