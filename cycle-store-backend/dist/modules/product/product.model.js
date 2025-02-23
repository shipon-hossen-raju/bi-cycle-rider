"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "Product name cannot be empty"],
        minlength: [1, "Product name cannot be empty"],
    },
    brandName: {
        type: String,
        required: [true, "Brand name cannot be empty"],
        minlength: [1, "Brand name cannot be empty"],
    },
    productTitle: {
        type: String,
        required: [true, "Product title cannot be empty"],
        minlength: [1, "Product title cannot be empty"],
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"],
        minlength: [1, "Description cannot be empty"],
    },
    tags: {
        type: String,
        required: false,
    },
    productType: {
        type: {
            type: String,
            required: [true, "Type cannot be empty"],
            minlength: [1, "Type cannot be empty"],
        },
        subType: {
            type: String,
            required: false,
        },
    },
    prices: {
        regular: {
            type: Number,
            required: [true, "Regular price is required"],
            min: [0, "Regular price must be a non-negative integer"],
        },
        sale: {
            type: Number,
            required: [true, "Sale price is required"],
            min: [0, "Sale price must be a non-negative integer"],
        },
        currency: {
            type: String,
            required: [true, "Currency is required"],
            enum: ["USD", "EUR", "INR", "BDT"],
            message: "Currency must be one of 'USD', 'EUR', 'GBP', 'JPY', 'INR'",
            default: "BDT"
        },
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
        validate: {
            validator: (v) => {
                // Simple URL validation (you can use a more robust library if needed)
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    extraImages: {
        type: [String],
        required: [true, "At least one extra image is required"],
        validate: {
            validator: (v) => {
                return v.every((url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url));
            },
            message: (props) => `${props.value} contains invalid URLs!`,
        },
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be a non-negative integer"],
    },
    productStatus: {
        type: String,
        required: [true, "Product status is required"],
        enum: {
            values: ["active", "inActive"],
            message: "Product status must be either 'active' or 'inActive'",
        },
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    ratings: {
        type: [String],
        default: [],
    },
    reviews: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
const ProductModel = mongoose_1.default.model("product", productSchema);
exports.default = ProductModel;
