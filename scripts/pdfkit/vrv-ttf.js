var vrvTTF = "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Bkr8dSIn/htsZnpYDSIDGiARBwAAAgA+/sUBxwWgAAgADAAANxEzESUwESMRLQERBT4uAVsr/tABMP7QXAVE/iI4+ssB0aIrAbgvAAACAD7+4wIrBaoAGwAfAAABETMRNxUHETcVBxEjEQcRIxEHNTcRBzU3ETMRFRE3EQGSK25ubm4rvipsbGxsKr4EBAGm/mYj4yT+ZB7kIP58AXg4/n0BdSHhIwGhIuYgAab+aeb+XzYBpAAAAAAB/4P+ogJd/5wADQAABQ4BIyImJzMeATMyNjcCXSfLhYe5Ixciy2Nk0ChkdIaDd0ZSUkYAAf+D/qIDg/+cABEAAAUOAiMiLgEnMx4CMzI+ATcDgxms2Gtp0qcWFhe1x1FZyLMbZEt1Ojl2Sy9IISFILwAAAAH/g/6iBMv/nAARAAAFDgEEIyIkJiczHgEEMzIkNjcEyxrQ/t6gl/7k0hcWF+cBEHp5ARLtG2RLdDs6dEwvSCEhSC8AAAAOAK4AAQAAAAAAAAAAAAIAAQAAAAAAAQALABsAAQAAAAAAAgAHADcAAQAAAAAAAwAoAJEAAQAAAAAABAALANIAAQAAAAAABQALAPYAAQAAAAAABgALARoAAwABBAkAAAAAAAAAAwABBAkAAQAWAAMAAwABBAkAAgAOACcAAwABBAkAAwBQAD8AAwABBAkABAAWALoAAwABBAkABQAWAN4AAwABBAkABgAWAQIAAAAAVgBlAHIAbwB2AGkAbwBUAGUAeAB0AABWZXJvdmlvVGV4dAAAUgBlAGcAdQBsAGEAcgAAUmVndWxhcgAARgBvAG4AdABGAG8AcgBnAGUAIAAyAC4AMAAgADoAIABWAGUAcgBvAHYAaQBvAFQAZQB4AHQAIAA6ACAAMQA3AC0AMQAwAC0AMgAwADEANAAARm9udEZvcmdlIDIuMCA6IFZlcm92aW9UZXh0IDogMTctMTAtMjAxNAAAVgBlAHIAbwB2AGkAbwBUAGUAeAB0AABWZXJvdmlvVGV4dAAAVgBlAHIAcwBpAG8AbgAgADEALgAwAABWZXJzaW9uIDEuMAAAVgBlAHIAbwB2AGkAbwBUAGUAeAB0AABWZXJvdmlvVGV4dAAAAgAAAAAAAP9nAGYAAAAAAAAAAAAAAAAAAAAAAAAAAAAiAAAAAQACAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASAHdW5pRTFEMAd1bmlFMUQxB3VuaUUxRDIHdW5pRTFEMwd1bmlFMUQ0B3VuaUUxRDUHdW5pRTFENgd1bmlFMUQ3B3VuaUUxRDgHdW5pRTFEOQd1bmlFMURBB3VuaUUxREIHdW5pRTFEQwd1bmlFMUREB3VuaUUxREUHdW5pRTFERgd1bmlFMUUwB3VuaUUxRTEHdW5pRTFFMgd1bmlFMUUzB3VuaUUxRTQHdW5pRTFFNQd1bmlFMUU2B3VuaUUxRTcHdW5pRTFFOAd1bmlFMjYwB3VuaUUyNjEHdW5pRTI2Mgd1bmlFNTUwB3VuaUU1NTEHdW5pRTU1MgAAAAAAAf//AAIAAQAAAAwAAAAWAB4AAgABAAMAIQABAAQAAAACAAAAAQAAAAEAAAAAAAAAAQAAAADUGQHNAAAAANBnMXoAAAAA1S3uhw==";