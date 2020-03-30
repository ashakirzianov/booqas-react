import React from 'react';

export type Data = { data: any };
export type SelectFileDialogRef = {
    show: () => void,
};
export function SelectFileDialog({
    refCallback, onFilesSelected, dataKey, accept,
}: {
    accept?: string,
    dataKey: string,
    refCallback: (ref: SelectFileDialogRef) => void,
    onFilesSelected: (data: Data) => void,
}) {
    return <input
        accept={accept}
        style={{ display: 'none' }}
        ref={r => refCallback({ show: () => r && r.click() })}
        type='file'
        onChange={e => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const data = new FormData();
                data.append(dataKey, file);
                onFilesSelected({ data });
            }
        }}
    />;
}
