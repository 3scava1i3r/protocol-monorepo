import { expect } from "chai";
import { fetchEntityAndEnsureExistence } from "../../helpers/helpers";
import { IToken } from "../../interfaces";
import { getToken } from "../../queries/holQueries";

export const fetchTokenAndValidate = async (
    address: string,
    expectedName: string,
    expectedSymbol: string,
    expectedIsListed: boolean,
    expectedUnderlyingAddress: string,
    expectedDecimals: number
) => {
    const token = await fetchEntityAndEnsureExistence<IToken>(
        getToken,
        address,
        "Token"
    );

    validateTokenEntity(
        token,
        expectedName,
        expectedSymbol,
        expectedIsListed,
        expectedUnderlyingAddress,
        expectedDecimals
    );
};

export const validateTokenEntity = (
    subgraphToken: IToken,
    expectedName: string,
    expectedSymbol: string,
    expectedIsListed: boolean,
    expectedUnderlyingAddress: string,
    expectedDecimals: number
) => {
    expect(subgraphToken.name, "SuperToken: name error").to.equal(expectedName);
    expect(subgraphToken.symbol, "SuperToken: symbol error").to.equal(
        expectedSymbol
    );
    expect(subgraphToken.isListed, "SuperToken: isListed error").to.equal(
        expectedIsListed
    );
    expect(subgraphToken.decimals).to.equal(expectedDecimals);

    if (subgraphToken.underlyingAddress === "0x") {
        expect(subgraphToken.underlyingToken).to.equal(null);
    } else {
        // NOTE: underlyingToken should not be null here
        expect(subgraphToken.underlyingToken!.id).to.equal(
            expectedUnderlyingAddress.toLowerCase()
        );
    }
};
