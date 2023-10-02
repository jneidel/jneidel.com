+++
title = 'Transmission behind WireGuard'
date = 2023-10-02T11:27:05+02:00
+++

Walkthrough for my setup.
It's not specific to my VPN provider or server. Though I will name them as
examples.

This setup is heavily based on [this reddit post](https://www.reddit.com/r/VPNTorrents/comments/j1ap68/my_docker_setup_for_torrenting_transmission/).
With some adjustments to make it work.

## WireGuard

### Obtain the config

Go to your VPN providers website and generate a WireGuard configuration file.

For the example of mullvad: Go into the [WireGuard configuration section](https://mullvad.net/en/account/wireguard-config)
inside your account and select these options:

![create wireguard configuration for mullvad](/img/2023/wireguard-mullvad-config.png)

Save the result to the file `wg0.conf`. It will look a little like this:

```conf
[Interface]
PrivateKey = uOHkXPjTDL9W0KCOh/DjZRlaa+AORPin/A7e40Fc8G8=
Address = 10.66.170.182/32
DNS = 10.64.0.1

[Peer]
PublicKey = nAF0wrLG2+avwQfqxnXhBGPUBCvc3QCqWKH4nK5PfEU=
AllowedIPs = 0.0.0.0/0
Endpoint = 185.209.196.76:51820
```

To be able to access Transmissions Web UI we need to add these lines in the
`[Interface]` section:

```conf
PostUp = DROUTE=$(ip route | grep default | awk '{print $3}'); HOMENET=192.168.0.0/16; HOMENET2=10.0.0.0/8; HOMENET3=172.16.0.0/12; ip route add $HOMENET3 via $DROUTE;ip route add $HOMENET2 via $DROUTE; ip route add $HOMENET via $DROUTE;iptables -I OUTPUT -d $HOMENET -j ACCEPT;iptables -A OUTPUT -d $HOMENET2 -j ACCEPT; iptables -A OUTPUT -d $HOMENET3 -j ACCEPT;  iptables -A OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
PreDown = HOMENET=192.168.0.0/16; HOMENET2=10.0.0.0/8; HOMENET3=172.16.0.0/12; ip route del $HOMENET3 via $DROUTE;ip route del $HOMENET2 via $DROUTE; ip route del $HOMENET via $DROUTE; iptables -D OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT; iptables -D OUTPUT -d $HOMENET -j ACCEPT; iptables -D OUTPUT -d $HOMENET2 -j ACCEPT; iptables -D OUTPUT -d $HOMENET3 -j ACCEPT
```

The result will look like this:

```conf
[Interface]
PrivateKey = uOHkXPjTDL9W0KCOh/DjZRlaa+AORPin/A7e40Fc8G8=
Address = 10.66.170.182/32
DNS = 10.64.0.1
PostUp = DROUTE=$(ip route | grep default | awk '{print $3}'); HOMENET=192.168.0.0/16; HOMENET2=10.0.0.0/8; HOMENET3=172.16.0.0/12; ip route add $HOMENET3 via $DROUTE;ip route add $HOMENET2 via $DROUTE; ip route add $HOMENET via $DROUTE;iptables -I OUTPUT -d $HOMENET -j ACCEPT;iptables -A OUTPUT -d $HOMENET2 -j ACCEPT; iptables -A OUTPUT -d $HOMENET3 -j ACCEPT;  iptables -A OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
PreDown = HOMENET=192.168.0.0/16; HOMENET2=10.0.0.0/8; HOMENET3=172.16.0.0/12; ip route del $HOMENET3 via $DROUTE;ip route del $HOMENET2 via $DROUTE; ip route del $HOMENET via $DROUTE; iptables -D OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT; iptables -D OUTPUT -d $HOMENET -j ACCEPT; iptables -D OUTPUT -d $HOMENET2 -j ACCEPT; iptables -D OUTPUT -d $HOMENET3 -j ACCEPT

[Peer]
PublicKey = nAF0wrLG2+avwQfqxnXhBGPUBCvc3QCqWKH4nK5PfEU=
AllowedIPs = 0.0.0.0/0
Endpoint = 185.209.196.76:51820
```

### Start the container

Before we start the container we need to think about where to put the
configuration. On most OS's you can put them in
`/opt/docker/volumes/wireguard/config`, but on unraid that directory will not
survive a reboot, which is why I put it in `/opt/docker/volumes/wireguard/config`.

Once you decided on a directory, put your wireguard configuration file
`wg0.conf` in there.

Start the container:

```sh
docker run -d --name="wireguard" \ --volume /opt/docker/volumes/wireguard/config:/config \ --volume /lib/modules:/lib/modules \
    --publish 51820:51820/udp \
    --publish 9091:9091 \
    --env PUID=1022 \
    --env PGID=1022 \
    --env VIRTUAL_PORT=9091 \
    --cap-add=NET_ADMIN \
    --cap-add=SYS_MODULE \
    --sysctl="net.ipv4.conf.all.src_valid_mark=1" \
    --restart=unless-stopped \
    linuxserver/wireguard
```

If it tells you that the named container already exists, you can remove it
like this:

```sh
docker stop wireguard 2>/dev/null
docker rm wireguard 2>/dev/null
```
Checkout the image on [docker hub](https://hub.docker.com/r/linuxserver/wireguard) for more configuration options.

### Debugging

Look the logs:

```sh
docker logs wireguard
```

Success would look something like this:

![](/img/2023/wireguard-success.png)

I had the error: `Error: IPv6 is disabled on nexthop device.`, which is why I
disabled IPv6 when selecting the wireguard configuration. This can also be
achieved by removing any IPv6 addresses in the `Address` and `AllowedIPs` fields
of the configuration.

## Transmission

### Start the container

With the config directory the same considerations as with wireguard apply
so maybe `/opt/docker/volumes/transmission/config` is the one for you.
Additionally you also need to specify a directory for completed and
incompleted download files. I store them on my unraid media share in a torrents
directory (`/mnt/user/media/torrents`), but you should choose a directory of
your own.

Since we want to use the transmission web UI which does not come bundled anymore
we need to install it ourselves.

There are multiple available. For demonstration purposes we're using
transmission-web-control.

Head over to their [Github releases](https://github.com/transmission-web-control/transmission-web-control/releases)
and pick the link to their latest release as `dist.zip`.

Then in your terminal go into your transmission config directory:

```sh
cd /opt/docker/volumes/transmission/config # for example, use your own
mkdir web
wget https://github.com/transmission-web-control/transmission-web-control/releases/download/v1.6.31/dist.zip # latest version at the time of writing
unzip dist.zip
mv dist transmission-web-control
rm dist.zip
```

With this you can start the container:

```sh
docker run -d --name="transmission" \
    --volume /opt/docker/volumes/transmission/config:/config \
    --volume '/mnt/downloads/torrents':/downloads \
    --network=container:wireguard \
    --env UID=1008 \
    --env GID=1008 \
    --env TRANSMISSION_WEB_HOME=/config/web/transmission-web-control \
    --env TZ="Europe/Berlin" \
    --restart=unless-stopped \
    linuxserver/transmission
```

You can also pass a third `--volume`, which transmission will watch. Any
`.torrent` files added there will be created as torrents in the application.

Checkout the image on [docker hub](https://hub.docker.com/r/linuxserver/transmission) for more configuration options.

## Testing connectivity and transmission

```sh
docker exec wireguard sh -c 'curl -Ss https://ipinfo.io'
docker exec transmission sh -c 'curl -Ss https://ipinfo.io'

# if these say 'Could not resolve host' try restarting the containers:
docker restart wireguard && docker restart transmission
```

The output will look at little like this:
```json
{
  "ip": "185.209.196.210",
  "city": "Frankfurt am Main",
  "region": "Hesse",
  "country": "DE",
  "loc": "50.1155,8.6842",
  "org": "AS39351 31173 Services AB",
  "postal": "60306",
  "timezone": "Europe/Berlin",
  "readme": "https://ipinfo.io/missingauth"
}
```
Notice that the given IP is the one specified in your wireguard config as the
`Endpoint` and the city is the one I chose on mullvads website.

The transmission web UI will now be available on port `9091` (http://192.168.178.69:9091 for me).
To test that transmission works you for example download the [archlinux iso](https://archlinux.org/download).

## Notes and caveats

**Seeding:**

The setup as described here is only capable of downloading torrents not of seeding them.
This comes with some downsides, which you need to evaluate for yourself.
You can add the capacity for seeding, you just need a VPN provider capable of port
forwarding and some slight adjustments.
See the original [reddit post](https://www.reddit.com/r/VPNTorrents/comments/j1ap68/my_docker_setup_for_torrenting_transmission/) for that.

**Other torrent daemons:**

In place of transmission another torrent daemon may be used. Adjust the line
`--publish 9091:9091` that configures web UI formwarding in the wireguard
command accordingly.

**Other ways of testing connectivity:**

In the comments of [reddit post](https://www.reddit.com/r/VPNTorrents/comments/j1ap68/my_docker_setup_for_torrenting_transmission/)
there are also other ways of testing connectivity described.


