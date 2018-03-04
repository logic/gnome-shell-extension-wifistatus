// WiFi Status - A GNOME Shell extension to display WiFi signal status
// Copyright (C) 2018 Ed Marshall
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Spawn = Me.imports.spawn.Spawn;

const RE_ESSID = /ESSID:"([^"]*)"\s*$/;
const RE_QUALITY = /Link Quality=([0-9]*)\/([0-9]*)/;

function Schedulable(signalCallBack, essidCallBack) {
    Spawn('./', ['/usr/sbin/iwconfig'], (line) => {
        let essid = RE_ESSID.exec(line);
        if (essid) {
            essidCallBack(essid[1]);
        }
        let qual = RE_QUALITY.exec(line);
        if (qual) {
            signalCallBack(Number(qual[1]), Number(qual[2]));
        }
    });
}
