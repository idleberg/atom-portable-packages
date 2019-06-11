"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compressionType: {
        title: 'Compression Type',
        description: 'Specify the default compression type',
        type: 'string',
        default: 'DEFLATE',
        enum: [
            'STORE',
            'DEFLATE',
        ],
        order: 1
    },
    compressionLevel: {
        title: 'Compression Level',
        description: 'Specify the default compression level for `DEFLATE`',
        type: 'number',
        default: 6,
        minimum: 1,
        maximum: 9,
        order: 2
    },
    ignoreFile: {
        title: 'Ignore File',
        description: 'Specify which kind of ignore file to consider for packaging. Take not that global `.gitignore` files will not be taken into account.',
        type: 'string',
        default: '.atomignore',
        enum: [
            '.atomignore',
            '.gitignore',
            '.npmignore',
        ],
        order: 3
    },
    revealFile: {
        title: 'Reveal Package',
        description: 'Reveal package after its creation',
        type: 'boolean',
        default: true,
        order: 4
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsZUFBZSxFQUFFO1FBQ2YsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsSUFBSSxFQUFFO1lBQ04sT0FBTztZQUNQLFNBQVM7U0FDUjtRQUNELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixLQUFLLEVBQUUsbUJBQW1CO1FBQzFCLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFLGFBQWE7UUFDcEIsV0FBVyxFQUFFLHNJQUFzSTtRQUNuSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLElBQUksRUFBRTtZQUNOLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtTQUNYO1FBQ0QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUMifQ==