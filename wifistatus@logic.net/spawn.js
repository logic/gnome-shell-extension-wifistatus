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

const Gio   = imports.gi.Gio;
const GLib  = imports.gi.GLib;
const Lang  = imports.lang;

var SpawnReader = function () { };

SpawnReader.prototype.spawn = function (path, command, func) {
    let [res, pid, stdin, stdout, stderr] = GLib.spawn_async_with_pipes(
        path, command, null, GLib.SpawnFlags.SEARCH_PATH, null);

    let stream = new Gio.DataInputStream({
        base_stream: new Gio.UnixInputStream({ fd: stdout })
    });

    this.read(stream, func);
};

SpawnReader.prototype.read = function (stream, func) {
    stream.read_line_async(GLib.PRIORITY_LOW, null, Lang.bind(this, function (source, res) {
        let out, length;
        [out, length] = source.read_line_finish(res);

        if (out !== null) {
            func(out);
            this.read(source, func);
        }
    }));
};
