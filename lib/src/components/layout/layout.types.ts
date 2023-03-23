export type FractionalSize =
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "2/4"
  | "3/4"
  | "1/5"
  | "2/5"
  | "3/5"
  | "4/5"
  | "1/6"
  | "2/6"
  | "3/6"
  | "4/6"
  | "5/6"
  | "1/12"
  | "2/12"
  | "3/12"
  | "4/12"
  | "5/12"
  | "6/12"
  | "7/12"
  | "8/12"
  | "9/12"
  | "10/12"
  | "11/12";

export type SizeToken =
  | "0.5u"
  | "1u"
  | "1.5u"
  | "2u"
  | "2.5u"
  | "3u"
  | "3.5u"
  | "4u"
  | "5u"
  | "6u"
  | "7u"
  | "8u"
  | "9u"
  | "10u"
  | "11u"
  | "12u"
  | "14u"
  | "16u"
  | "20u"
  | "24u"
  | "28u"
  | "32u"
  | "36u"
  | "40u"
  | "44u"
  | "48u"
  | "52u"
  | "56u"
  | "60u"
  | "64u"
  | "72u"
  | "80u"
  | "96u"
  | "128u"
  | "192u"
  | "256u";

export type CommonLayoutProps = {
  /**
   * Defines width of the element.
   *
   * The width can be defined in either:
   * 1. Fractional sizes, e.g. 1/2, 1/3, 2/3, etc.
   * 2. Size unit tokens. Each unit is equal to 4px or 0.25rem, e.g. 1u = 4px, 2u = 8px, etc.
   * 3. full for 100% width.
   * 4. auto for width to be determined by the browser.
   * @default auto
   */
  width?: FractionalSize | SizeToken | "full" | "auto" | `${number}px`;
  /**
   * Defines height of the element.
   *
   * The height can be defined in either:
   * 1. Fractional sizes, e.g. 1/2, 1/3, 2/3, etc.
   * 2. Size unit tokens. Each unit is equal to 4px or 0.25rem, e.g. 1u = 4px, 2u = 8px, etc.
   * 3. full for 100% height.
   * 4. auto for height to be determined by the browser.
   * @default auto
   */
  height?: FractionalSize | SizeToken | "full" | "auto" | `${number}px`;
  /**
   * If true, the element will grow to fill available space.
   *
   * This prop works only if the element is a direct child of a Stack.
   */
  grow?: boolean;
};
