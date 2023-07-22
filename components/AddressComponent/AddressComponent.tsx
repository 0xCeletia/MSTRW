import React from "react";

interface AddressComponentProps {
    // address: string;
    address: string | undefined;
    className?: string;
}

const AddressComponent: React.FC<AddressComponentProps> = ({ address }) => {
    const shortenAddress = (
        address: string | undefined,
        digits = 4
    ): string => {
        if (!address) return "";
        return `${address.substring(0, digits + 2)}...${address.substring(
            address.length - digits
        )}`;
    };

    return <div>{shortenAddress(address)}</div>;
};

export default AddressComponent;
