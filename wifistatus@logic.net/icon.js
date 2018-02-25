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

const icon_names = [
    'none',
    'weak',
    'ok',
    'good',
    'excellent',
];

var Unknown = 'network-wireless-no-route-symbolic';

function Pick(current, range) {
    let choice = Math.round((current / range) * icon_names.length);
    return 'network-wireless-signal-' + icon_names[choice] + '-symbolic';
}
