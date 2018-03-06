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

const Main = imports.ui.main;
const MainLoop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Icon = Me.imports.icon;
const Wireless = Me.imports.wireless;

class WifiStatus extends PanelMenu.SystemIndicator {
    constructor() {
        super();

        // Wifi status icon
        this._indicator = this._addIndicator();
        this._indicator.icon_name = Icon.Unknown;
        Main.panel.statusArea.aggregateMenu._indicators.insert_child_at_index(this.indicators, 0);

        // Wifi status text in menu
        this._item = new PopupMenu.PopupSubMenuMenuItem('Disconnected', true);
        this._item.icon.icon_name = Icon.Unknown;
        this.menu.addMenuItem(this._item, 0);
        Main.panel.statusArea.aggregateMenu.menu.addMenuItem(this.menu, 4);

        MainLoop.timeout_add_seconds(5, () => {
            try {
                Wireless.Schedulable(
                    (value, max) => {
                        this._indicator.icon_name = Icon.Pick(value, max);
                        this._item.icon.icon_name = this._indicator.icon_name;
                    },
                    (essid) => {
                        if (!essid) {
                            this._item.label.text = '-';
                        } else {
                            this._item.label.text = essid;
                        }
                    }
                );
            } catch (e) {
                print(e);
            }
            return true;
        });
    }
};

let wifi;

function init() {
    if (!wifi) {
        wifi = new WifiStatus;
    }
}

function enable() {
}

function disable() {
}
