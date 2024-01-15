import moji from "moji";
import { trigram } from "n-gram";
//@ts-expect-error jsのやつを無理やり使うからね
import TinySegmenter from "tiny-segmenter";

const segmenter = new TinySegmenter();

function _tokenize(text: string, tokenizer: string) {
    if (tokenizer === "trigram") {
        return trigram(text);
    } else {
        return segmenter.segment(text) as string[];
    }
}

export function tokenize(text: string /*, tokenizer: string*/) {
    const query = moji(text)
        .convert("HK", "ZK")
        .convert("ZS", "HS")
        .convert("ZE", "HE")
        .toString()
        .trim();
    return _tokenize(query, "triram")
        .map((word: string) => {
            if (word !== " ") {
                return moji(word).convert("HG", "KK").toString().toLowerCase();
            }
        })
        .filter((v) => v);
}

export function encode(text: string) {
    return moji(text)
        .convert("HK", "ZK")
        .convert("ZS", "HS")
        .convert("ZE", "HE")
        .convert("HG", "KK")
        .toString()
        .trim()
        .toLowerCase();
}
