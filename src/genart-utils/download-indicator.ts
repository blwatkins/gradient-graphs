/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export enum DownloadState {
    Downloading = 'downloading',
    Success = 'success',
    Failure = 'failure',
    Idle = 'idle',
}

export abstract class DownloadIndicator {
    #state: DownloadState = DownloadState.Idle;

    public get state(): DownloadState {
        return this.#state;
    }

    public start():  void {
        this.#state = DownloadState.Downloading;
        this.downloadStart();
    }

    public success(): void {
        this.#state = DownloadState.Success;
        this.downloadSuccess();
    }

    public failure(): void {
        this.#state = DownloadState.Failure;
        this.downloadFailure();
    }

    public idle(): void {
        this.#state = DownloadState.Idle;
        this.downloadIdle();
    }

    protected abstract downloadStart(): void;

    protected abstract downloadSuccess(): void;

    protected abstract downloadFailure(): void;

    protected abstract downloadIdle(): void;

    protected isDownloading(): boolean {
        return this.#state === DownloadState.Downloading;
    }

    protected hasSuccess(): boolean {
        return this.#state === DownloadState.Success;
    }

    protected hasFailure(): boolean {
        return this.#state === DownloadState.Failure;
    }

    protected isIdle(): boolean {
        return this.#state === DownloadState.Idle;
    }
}
