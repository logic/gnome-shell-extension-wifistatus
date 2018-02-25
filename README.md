This is a simple GNOME Shell extension that inspects the output of `iwconfig`
periodically, and updates a WiFi signal strength icon in the top bar based on
the result.

My use case for this was pretty simple: I don't use NetworkManager anymore
(having switched to using wpa_supplicant directly, with systemd-networkd),
but still wanted a visual cue as to my network signal strength.
