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

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const MainLoop = imports.mainloop;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Icon = Me.imports.icon;
const Wireless = Me.imports.wireless;

let button, icon;

function _updateESSID(essid) {
    // Nothing to do yet
}

function _updateIcon(value, max) {
    icon.icon_name = Icon.Pick(value, max)
}

function init() {
    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });

    icon = new St.Icon({
        icon_name: Icon.Unknown,
        style_class: 'system-status-icon'
    });

    button.set_child(icon);
    MainLoop.timeout_add_seconds(5, Wireless.Schedulable(_updateIcon, _updateESSID));
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
