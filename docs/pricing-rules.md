# Pricing Rules

The app uses one shared pricing engine in `lib/pricing.ts`. The frontend calculator, dashboard checkout, and backend Paystack initialization all call the same rules.

## Formula

```text
calculated_price = word_count * service_base_rate * turnaround_multiplier
final_price = max(30.00, round_to_2_decimals(calculated_price))
```

The `$30.00` floor is internal. The customer-facing UI shows only the final price.

## Service Rates

| Service type | Base rate per word |
| --- | ---: |
| Proofreading | $0.018 |
| Editing | $0.030 |
| Academic Editing | $0.032 |
| Business Editing | $0.030 |
| Formatting | $0.014 |
| Translation | $0.048 |
| Transcribing | $0.026 |
| Writing Support | $0.055 |

## Turnaround Multipliers

| Turnaround | Multiplier | Automatic word limit |
| --- | ---: | ---: |
| 24 hours | 1.35 | 6,000 |
| 48 hours | 1.22 | 10,000 |
| 3 days | 1.15 | 18,000 |
| 4 days | 1.10 | 24,000 |
| 5 days | 1.06 | 30,000 |
| 6 days | 1.03 | 40,000 |
| 7 days | 1.00 | 50,000 |
| 8-14 days | 1.00 | 50,000 |
| 15-20 days | 0.96 | 50,000 |
| 21-27 days | 0.94 | 50,000 |
| 4 weeks / 28 days | 0.92 | 50,000 |

Documents above 50,000 words require a custom quote and cannot proceed through automatic checkout.

## Examples

| Scenario | Calculation | Final price |
| --- | --- | ---: |
| 3,500 words, Editing, 14 days | 3,500 * 0.030 * 1.00 | $105.00 |
| 3,500 words, Editing, 24 hours | 3,500 * 0.030 * 1.35 | $141.75 |
| 3,500 words, Editing, 48 hours | 3,500 * 0.030 * 1.22 | $128.10 |
| 3,500 words, Editing, 3 days | 3,500 * 0.030 * 1.15 | $120.75 |
| 3,500 words, Editing, 7 days | 3,500 * 0.030 * 1.00 | $105.00 |
| 3,500 words, Editing, 4 weeks / 28 days | 3,500 * 0.030 * 0.92 | $96.60 |
| 2 words, Editing, 10 days | 2 * 0.030 * 1.00 = $0.06, then internal floor | $30.00 |

## Checkout Validation

Checkout is blocked before payment initialization when:

| Condition | Result |
| --- | --- |
| 24 hours selected and word count is above 6,000 | Block checkout; ask user to choose a longer timeline or contact editors |
| 48 hours selected and word count is above 10,000 | Block checkout; ask user to choose a longer timeline or contact editors |
| 3-6 days selected and word count exceeds the configured short-deadline limit | Block checkout; show custom timeline message |
| More than 50,000 words | Block checkout; require custom quote |
| Turnaround is outside 1-28 days | Block checkout; require custom timeline |

Paystack receives the backend-verified `final_price` in cents. The browser-submitted price is never trusted.
