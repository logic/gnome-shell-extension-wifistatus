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

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Spawn = Me.imports.spawn;

function Schedulable(signalCallBack, essidCallBack) {
    return () => {
        new Spawn.SpawnReader().spawn('./', ['iwconfig'], (line) => {
            let res;
            res = String(line).match(/ESSID:"([^"]*)"$/);
            if (res) {
                essidCallBack(res[1])
            }
            res = String(line).match(/Link Quality=([0-9]*)\/([0-9]*)/);
            if (res) {
                signalCallBack(Number(res[1]), Number(res[2]))
            }
        });
        return true;
    }
}
