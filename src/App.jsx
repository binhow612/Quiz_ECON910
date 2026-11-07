import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Clock, BookOpen, ChevronLeft, ChevronRight, MessageSquare, Loader2, Target, CheckCircle2, XCircle } from 'lucide-react';

const quizDataset = [
  // MICROECONOMICS (Q1 - Q60)
            { id: 1, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "Which statement best reflects the fundamental nature of the economic problem?", options: ["A) Opaque government allocation.", "B) Unlimited human wants vs. limited resources.", "C) Rapid depletion of fossil fuels.", "D) Inflation reducing purchasing power."], correct: 1, explanation: "Scarcity arises from the persistent conflict between unlimited human wants and the limited resources available to satisfy them.", trap: "Confusing specific macro issues (inflation) with the general micro concept of scarcity." },
            { id: 2, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "A tech firm spent $200k developing software. It costs $50k to finish, with expected revenue of $180k. The optimal decision is to:", options: ["A) Cancel, as total cost $250k > $180k.", "B) Continue, as marginal benefit ($180k) > marginal cost ($50k).", "C) Cut $50k elsewhere.", "D) Raise prices."], correct: 1, explanation: "$200,000 is a Sunk Cost. Rational marginal analysis only compares future marginal benefits ($180k) with future marginal costs ($50k).", trap: "Falling victim to the Sunk Cost Fallacy by including past non-recoverable costs." },
            { id: 3, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "You get a free ticket (value $20). Tonight, you could work to earn $30 or go to a party (fee $10, valued at $45 satisfaction). The opportunity cost of the movie is:", options: ["A) $20", "B) $30", "C) $35", "D) $45"], correct: 2, explanation: "Surplus from party = $45 - $10 = $35. Surplus from work = $30. The highest forgone surplus is $35.", trap: "Calculating total values rather than the net surplus of the next best alternative." },
            { id: 4, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "A production possibilities frontier (PPF) bowed outward illustrates:", options: ["A) Constant opportunity costs.", "B) Decreasing opportunity costs.", "C) Increasing opportunity costs.", "D) Unlimited resources."], correct: 2, explanation: "Resources are not perfectly adaptable across all goods, so shifting production causes increasing opportunity costs.", trap: "Assuming constant opportunity costs, which would yield a straight-line PPF." },
            { id: 5, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "A point located INSIDE the production possibilities frontier (PPF) represents:", options: ["A) Unattainable state.", "B) Inefficient use of resources or unemployment.", "C) Optimal productive efficiency.", "D) Economic growth."], correct: 1, explanation: "Points inside the PPF show a failure to utilize all available resources efficiently.", trap: "Misinterpreting boundary limits; thinking inside is safe or optimal." },
            { id: 6, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "Country A takes 10h to produce 1 car, 2h for 1 ton of rice. Country B takes 15h for 1 car, 5h for 1 ton of rice. Who has comparative advantage?", options: ["A) A in rice, B in cars.", "B) A in cars, B in rice.", "C) A in both.", "D) B in both."], correct: 0, explanation: "A's OC for 1 car = 5 rice. B's OC for 1 car = 3 rice (B wins cars). A's OC for 1 rice = 0.2 cars. B's OC for 1 rice = 0.33 cars (A wins rice).", trap: "Confusing absolute advantage with comparative advantage." },
            { id: 7, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "Positive economic analysis differs from normative analysis because it:", options: ["A) Provides objective, testable statements about 'what is'.", "B) Provides value judgments.", "C) Offers policy recommendations.", "D) Ignores empirical data."], correct: 0, explanation: "Positive economics describes objective, verifiable facts, whereas normative involves subjective judgments.", trap: "Reversing the definitions of positive and normative." },
            { id: 8, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "The opportunity cost of attending college DOES NOT include:", options: ["A) Tuition and textbooks.", "B) Basic food and living expenses.", "C) Forgone earnings.", "D) Extra housing costs."], correct: 1, explanation: "Basic survival expenses are incurred regardless of college attendance, thus not an opportunity cost of the choice.", trap: "Assuming all out-of-pocket expenses are opportunity costs." },
            { id: 9, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "Absolute advantage is achieved when an entity:", options: ["A) Has a lower opportunity cost.", "B) Can produce a good using fewer inputs than another.", "C) Has a larger surplus.", "D) Sets a lower price."], correct: 1, explanation: "Absolute advantage compares direct productivity based on absolute input amounts required per unit.", trap: "Equating absolute advantage with comparative advantage." },
            { id: 10, domain: 'micro', topic: 'Khan Hiếm & Chi Phí Cơ Hội', question: "If a country engages in international trade based on comparative advantage, it will:", options: ["A) Consume outside its domestic PPF.", "B) Reduce domestic consumption.", "C) Suffer compared to autarky.", "D) Become entirely dependent."], correct: 0, explanation: "Specialization and trade expand consumption possibilities beyond domestic production limits.", trap: "Believing trade eliminates scarcity or shifts the domestic PPF itself." },

            { id: 11, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "Which event shifts the demand curve for cars to the RIGHT?", options: ["A) A decrease in car prices.", "B) An increase in consumer income (normal good).", "C) Price of gasoline doubles.", "D) Decrease in steel costs."], correct: 1, explanation: "Higher income raises demand at every price, shifting the entire curve right.", trap: "Confusing a movement along the curve (price change) with a shift." },
            { id: 12, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "When the government imposes a binding Price Floor on agricultural products:", options: ["A) A shortage occurs.", "B) A surplus occurs.", "C) Equilibrium price falls.", "D) Consumer surplus maximizes."], correct: 1, explanation: "A binding price floor is set ABOVE equilibrium, meaning quantity supplied exceeds quantity demanded.", trap: "Confusing the effects of a price floor with a price ceiling." },
            { id: 13, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "Demand: Qd = 100 - 2P, Supply: Qs = 10 + P. Equilibrium Price and Quantity are:", options: ["A) P=30, Q=40", "B) P=20, Q=60", "C) P=30, Q=50", "D) P=40, Q=20"], correct: 0, explanation: "100 - 2P = 10 + P => 3P = 90 => P = 30. Q = 10 + 30 = 40.", trap: "Basic algebraic isolation error." },
            { id: 14, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "If a decrease in the price of A leads to an increase in demand for B, A and B are:", options: ["A) Substitutes.", "B) Complements.", "C) Inferior goods.", "D) Independent."], correct: 1, explanation: "Cheaper A leads to more consumption of A, pulling up demand for B since they are used together.", trap: "Reversing substitutes and complements." },
            { id: 15, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "The actual tax burden falls mostly on BUYERS if:", options: ["A) Demand is more elastic than supply.", "B) Demand is less elastic than supply.", "C) Supply is perfectly elastic.", "D) Sellers legally pay the tax."], correct: 1, explanation: "The less elastic (less flexible) side of the market bears the larger share of the tax incidence.", trap: "Assuming legal incidence determines economic incidence." },
            { id: 16, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "Deadweight loss (DWL) from a tax arises because:", options: ["A) It reduces quantity traded below the socially optimal level.", "B) Tax revenues are wasted.", "C) Producer surplus transfers to consumers.", "D) Prices decrease."], correct: 0, explanation: "The tax wedge prevents mutually beneficial trades where WTP > MC from occurring.", trap: "Believing DWL is just the tax revenue collected by the government." },
            { id: 17, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "If both Supply and Demand increase simultaneously:", options: ["A) Equilibrium price rises.", "B) Equilibrium quantity rises.", "C) Equilibrium price falls.", "D) Equilibrium quantity falls."], correct: 1, explanation: "Both shifts increase Q. P is ambiguous (increased D raises P, increased S lowers P).", trap: "Trying to definitively guess the price effect without magnitude data." },
            { id: 18, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "Consumer Surplus on a graph is the area:", options: ["A) Below equilibrium price, above supply.", "B) Below demand curve, above actual price paid.", "C) Between supply and demand.", "D) Above the demand curve."], correct: 1, explanation: "CS is the difference between willingness to pay (demand) and the market price.", trap: "Confusing Consumer Surplus with Producer Surplus." },
            { id: 19, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "A binding Price Ceiling on apartment rentals typically causes:", options: ["A) Improved quality.", "B) Severe shortages and black markets.", "C) More apartment construction.", "D) Equal benefit for all."], correct: 1, explanation: "Rent control discourages investment and maintenance while boosting demand, creating shortages.", trap: "Believing price ceilings magically solve scarcity." },
            { id: 20, domain: 'micro', topic: 'Cung Cầu & Mô Hình Thị Trường', question: "A government subsidy to producers has an effect similar to:", options: ["A) A consumption tax.", "B) Decreasing production costs, shifting supply right.", "C) A price ceiling.", "D) Decreasing equilibrium quantity."], correct: 1, explanation: "Subsidies lower the firm's marginal cost of production, shifting the supply curve outward/downward.", trap: "Confusing subsidies with taxes." },

            { id: 21, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "A 10% price increase leads to a 2% quantity decrease. The PED is:", options: ["A) -0.2 (Inelastic)", "B) -5.0 (Elastic)", "C) -1.0 (Unit)", "D) -2.0"], correct: 0, explanation: "%ΔQ / %ΔP = -2% / 10% = -0.2. Absolute value < 1 means inelastic.", trap: "Inverting the formula to %ΔP / %ΔQ." },
            { id: 22, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "If demand is highly ELASTIC, a firm wanting to increase Total Revenue should:", options: ["A) Increase price.", "B) Decrease price.", "C) Keep price unchanged.", "D) Cut production."], correct: 1, explanation: "The % increase in quantity will outweigh the % decrease in price, raising overall TR.", trap: "Assuming raising prices always increases revenue." },
            { id: 23, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "Cross-price elasticity (XED) between Tea and Coffee is +1.8. They are:", options: ["A) Complements.", "B) Substitutes.", "C) Inferior.", "D) Luxury."], correct: 1, explanation: "Positive XED means price rise in one increases demand for the other.", trap: "Confusing positive/negative signs for XED." },
            { id: 24, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "Income elasticity (YED) for instant noodles is -0.5. They are:", options: ["A) Normal necessities.", "B) Luxury goods.", "C) Inferior goods.", "D) Complements."], correct: 2, explanation: "Negative YED means demand falls as income rises.", trap: "Ignoring the negative sign." },
            { id: 25, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "Which factor makes demand MORE ELASTIC?", options: ["A) No close substitutes.", "B) Daily necessity.", "C) Longer time horizon to adjust.", "D) Tiny fraction of budget."], correct: 2, explanation: "Over time, consumers find alternatives, making demand more responsive.", trap: "Assuming short-run demand is more elastic." },
            { id: 26, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "At the exact midpoint of a linear demand curve, |PED| is:", options: ["A) Zero.", "B) Exactly 1.", "C) Infinity.", "D) Greater than 1."], correct: 1, explanation: "Elasticity falls from infinity to zero, hitting exactly 1 at the midpoint where TR is maximized.", trap: "Confusing constant slope with constant elasticity." },
            { id: 27, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "If Supply is perfectly INELASTIC, a tax levied on sellers falls:", options: ["A) Entirely on consumers.", "B) Entirely on producers.", "C) Equally on both.", "D) On the government."], correct: 1, explanation: "The completely inflexible side (PES=0) cannot escape the tax and bears 100% burden.", trap: "Assuming sellers always pass taxes to buyers." },
            { id: 28, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "A vertical demand curve has a price elasticity of:", options: ["A) 0 (Perfectly inelastic).", "B) 1.", "C) Infinity.", "D) -1."], correct: 0, explanation: "Quantity demanded does not respond at all to price changes.", trap: "Confusing vertical (0) with horizontal (infinity)." },
            { id: 29, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "Total Revenue reaches its MAXIMUM when Marginal Revenue is:", options: ["A) Equal to 1.", "B) Equal to 0.", "C) Maximized.", "D) Equal to MC."], correct: 1, explanation: "MR is the derivative of TR. When MR=0, TR has peaked.", trap: "Confusing profit maximization (MR=MC) with revenue maximization (MR=0)." },
            { id: 30, domain: 'micro', topic: 'Độ Co Giãn (Elasticity)', question: "In the elastic region of a demand curve (|PED| > 1), Marginal Revenue is:", options: ["A) Positive.", "B) Negative.", "C) Zero.", "D) Equal to Price."], correct: 0, explanation: "Lowering price increases TR in the elastic region, meaning the marginal revenue of the extra unit is positive.", trap: "Assuming MR is always equal to price." },

            { id: 31, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "The Law of Diminishing Marginal Utility states that:", options: ["A) Additional satisfaction from consuming one more unit declines as more is consumed.", "B) Total utility declines immediately.", "C) Prices rise with demand.", "D) Income limits purchasing power."], correct: 0, explanation: "The incremental joy of subsequent units is progressively less than the first.", trap: "Confusing marginal utility with total utility." },
            { id: 32, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "A consumer maximizes utility from goods X and Y when:", options: ["A) MU_X = MU_Y", "B) MU_X / P_X = MU_Y / P_Y", "C) P_X * X = P_Y * Y", "D) TU_X = TU_Y"], correct: 1, explanation: "Marginal utility per dollar spent must be equalized across all goods.", trap: "Equating raw marginal utilities without factoring in prices." },
            { id: 33, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "An Indifference Curve (IC) illustrates:", options: ["A) Combinations yielding the same level of total utility.", "B) Maximum budget.", "C) Optimal production.", "D) Minimum price accepted."], correct: 0, explanation: "The consumer is equally satisfied with any bundle on the same curve.", trap: "Confusing IC with the Budget Line." },
            { id: 34, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "The slope of the Budget Line is determined by:", options: ["A) Ratio of marginal utilities.", "B) Ratio of relative prices (-P_X / P_Y).", "C) Income divided by price.", "D) Marginal Rate of Substitution."], correct: 1, explanation: "It represents the objective market trade-off between the two goods.", trap: "Confusing market trade-off (Prices) with psychological trade-off (MRS)." },
            { id: 35, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "The Marginal Rate of Substitution (MRS) measures:", options: ["A) Relative market price.", "B) Amount of Y a consumer gives up for one more X, maintaining equal utility.", "C) Inflation rate.", "D) Income disparity."], correct: 1, explanation: "MRS is the slope of the indifference curve, representing subjective trade-offs.", trap: "Confusing MRS with the slope of the budget constraint." },
            { id: 36, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "At the consumer's optimal choice point:", options: ["A) MRS = P_X / P_Y", "B) IC intersects Budget Line twice.", "C) Total utility is zero.", "D) Income is not fully spent."], correct: 0, explanation: "Tangency occurs where subjective trade-off exactly matches market trade-off.", trap: "Believing intersection (rather than tangency) is optimal." },
            { id: 37, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "A Giffen Good is a product where:", options: ["A) Demand slopes upward due to a massive negative income effect overpowering substitution effect.", "B) It is a luxury status symbol.", "C) It has no income effect.", "D) Demand is perfectly elastic."], correct: 0, explanation: "A price rise makes the consumer so much poorer they must consume more of this cheap staple.", trap: "Confusing Giffen goods with Veblen (luxury) goods." },
            { id: 38, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "Indifference curves for PERFECT COMPLEMENTS (e.g., left and right shoes) are:", options: ["A) Downward-sloping straight lines.", "B) Right-angled L-shapes.", "C) Circles.", "D) Bowed outward."], correct: 1, explanation: "They must be consumed in fixed proportions; extra units of just one good yield no extra utility.", trap: "Confusing complements with perfect substitutes (straight lines)." },
            { id: 39, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "If MU_X / P_X > MU_Y / P_Y, the consumer should:", options: ["A) Buy more Y, less X.", "B) Buy more X, less Y.", "C) Maintain consumption.", "D) Stop buying both."], correct: 1, explanation: "A dollar spent on X yields more utility. Buying more X lowers its MU until ratios equalize.", trap: "Moving consumption in the wrong direction." },
            { id: 40, domain: 'micro', topic: 'Lý Thuyết Người Tiêu Dùng', question: "The Substitution Effect ALWAYS causes a consumer to:", options: ["A) Buy more of the relatively cheaper good.", "B) Buy less of the cheaper good.", "C) Maintain the same quantity.", "D) Consume more inferior goods."], correct: 0, explanation: "Rational consumers invariably substitute towards the relatively cheaper option, regardless of income effects.", trap: "Conflating substitution effect with income effect." },

            { id: 41, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "Which is classified as a Total Fixed Cost (TFC) in the short run?", options: ["A) Direct raw materials.", "B) Hourly wages.", "C) A 2-year factory lease payment.", "D) Electricity for machines."], correct: 2, explanation: "Fixed costs do not vary with output levels and must be paid even if production is zero.", trap: "Identifying variable inputs (labor, electricity) as fixed." },
            { id: 42, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "The geometric relationship between Marginal Cost (MC) and Average Total Cost (ATC) is:", options: ["A) MC is always above ATC.", "B) MC intersects ATC at its MINIMUM point.", "C) MC intersects ATC at its maximum.", "D) They are parallel."], correct: 1, explanation: "If the next unit costs less than average, ATC falls. If more, ATC rises. Thus they cross at the minimum.", trap: "Assuming intersection occurs at the profit-maximizing point." },
            { id: 43, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "A Perfectly Competitive firm is a 'Price Taker' meaning it faces:", options: ["A) A perfectly horizontal (infinitely elastic) demand curve.", "B) A downward-sloping demand curve.", "C) High barriers to entry.", "D) Differentiated products."], correct: 0, explanation: "The firm is too small to influence market price, selling all output at the prevailing rate.", trap: "Assuming individual firms face the downward-sloping market demand." },
            { id: 44, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "The universal profit-maximizing rule for ALL firms is to produce where:", options: ["A) P = minimum ATC", "B) MR = MC", "C) TR = TC", "D) MR = 0"], correct: 1, explanation: "Profits peak where the revenue from the last unit exactly offsets its production cost.", trap: "Confusing profit maximization with break-even (TR=TC)." },
            { id: 45, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "In the LONG RUN, free entry and exit in perfect competition force economic profits to:", options: ["A) Zero (P = minimum ATC).", "B) Negative values.", "C) Zero accounting profit.", "D) Maximum possible."], correct: 0, explanation: "Positive profits attract entrants, increasing supply and driving prices down to minimum average cost.", trap: "Confusing zero economic profit with zero accounting profit." },
            { id: 46, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "The short-run supply curve of a perfectly competitive firm is:", options: ["A) The entire ATC curve.", "B) The MC curve ABOVE minimum AVC.", "C) The AVC curve.", "D) The horizontal demand curve."], correct: 1, explanation: "The firm produces where P=MC, provided P > AVC.", trap: "Assuming the entire MC curve acts as supply." },
            { id: 47, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "Zero Economic Profit implies that:", options: ["A) The owner cannot afford living expenses.", "B) Revenues exactly cover all explicit and implicit opportunity costs.", "C) Bankruptcy is imminent.", "D) Accounting profits are zero."], correct: 1, explanation: "Earning zero economic profit means earning a 'normal profit', effectively covering opportunity costs.", trap: "Viewing zero economic profit as a business failure." },
            { id: 48, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "A pure Monopoly maximizes profit by producing where MR = MC and setting a price that is:", options: ["A) Greater than Marginal Cost (P > MC).", "B) Equal to Marginal Cost.", "C) Less than Marginal Revenue.", "D) Equal to fixed costs."], correct: 0, explanation: "Because the demand curve slopes downward, price exceeds marginal revenue.", trap: "Assuming monopolies set P = MC like competitive firms." },
            { id: 49, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "Perfect (First-Degree) Price Discrimination allows a monopolist to:", options: ["A) Charge everyone maximum WTP, converting all Consumer Surplus to Profit.", "B) Offer student discounts.", "C) Charge one single price.", "D) Cause massive deadweight loss."], correct: 0, explanation: "By extracting all surplus, the firm eliminates deadweight loss, reaching competitive output level.", trap: "Assuming price discrimination worsens deadweight loss." },
            { id: 50, domain: 'micro', topic: 'Chi Phí Sản Xuất & Thị Trường', question: "A Natural Monopoly arises primarily due to:", options: ["A) Government patents.", "B) Extensive economies of scale (downward sloping LRAC).", "C) Control over raw materials.", "D) Illegal collusion."], correct: 1, explanation: "A single firm can supply the whole market at a lower average cost than multiple competing firms.", trap: "Confusing natural monopolies with legal monopolies." },

            { id: 51, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Monopolistic Competition is characterized by:", options: ["A) Many sellers, differentiated products, low barriers to entry.", "B) Homogeneous products.", "C) A single seller.", "D) Massive long-run profits."], correct: 0, explanation: "Product differentiation gives slight pricing power, but free entry drives long-run economic profit to zero.", trap: "Confusing it with pure monopoly." },
            { id: 52, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "In Game Theory, a Nash Equilibrium is a situation where:", options: ["A) No player has incentive to unilaterally change strategy, given the other's choice.", "B) Both players maximize joint payoff.", "C) Strategies are completely random.", "D) Collusion is legally binding."], correct: 0, explanation: "It is a stable state where everyone optimizes against expected actions of others.", trap: "Assuming Nash equilibrium always yields the best collective outcome." },
            { id: 53, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Cartels in oligopolies are notoriously unstable because:", options: ["A) Firms become jealous.", "B) Each member has a strong incentive to secretly CHEAT for more profit.", "C) Governments force disbandment.", "D) Demand drops."], correct: 1, explanation: "Setting a high price creates a massive marginal benefit for secretly selling over the quota.", trap: "Underestimating inherent self-interest driving defection." },
            { id: 54, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "The Coase Theorem asserts that private parties can solve externalities if:", options: ["A) Property rights are clear and transaction costs are low/zero.", "B) Government intervenes.", "C) There are thousands of participants.", "D) Taxes are eliminated."], correct: 0, explanation: "Costless bargaining allows parties to negotiate efficient payments without state intervention.", trap: "Assuming government intervention is always strictly necessary." },
            { id: 55, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Public Goods possess which two defining characteristics?", options: ["A) Non-rivalry and Non-excludability.", "B) Rivalry and Excludability.", "C) Private production only.", "D) Extremely high prices."], correct: 0, explanation: "One's use doesn't diminish another's, and non-payers cannot be stopped from using it.", trap: "Confusing public goods with common resources (which are rival)." },
            { id: 56, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Adverse Selection typically occurs:", options: ["A) BEFORE a transaction takes place (e.g., Lemons market).", "B) AFTER an insurance contract is signed.", "C) When there is zero risk.", "D) With perfect information."], correct: 0, explanation: "Hidden characteristics prior to a deal drive high-quality goods out of the market.", trap: "Confusing Adverse Selection with Moral Hazard (post-contract)." },
            { id: 57, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Moral Hazard refers to the behavior where:", options: ["A) Individuals become less cautious AFTER purchasing insurance.", "B) Tax evasion occurs.", "C) Monopolies fix prices.", "D) Lemons are sold."], correct: 0, explanation: "Being shielded from risk alters incentives, leading to riskier hidden actions.", trap: "Confusing Moral Hazard with Adverse Selection." },
            { id: 58, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "Market Failure occurs when:", options: ["A) The free market fails to allocate resources efficiently to maximize total surplus.", "B) Market produces maximum surplus.", "C) Inflation drops to zero.", "D) Prices remain perfectly stable."], correct: 0, explanation: "Externalities, public goods, monopolies, and asymmetric info prevent allocative efficiency.", trap: "Assuming market corrections are market failures." },
            { id: 59, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "If a firm has Total Cost TC = Q^2 + 2Q + 100, its Marginal Cost (MC) function is:", options: ["A) MC = 2Q + 2", "B) MC = Q + 2", "C) MC = 2Q", "D) MC = Q^2 + 2"], correct: 0, explanation: "Marginal cost is the first derivative of Total Cost with respect to Q.", trap: "Confusing MC with Average Cost." },
            { id: 60, domain: 'micro', topic: 'Thất Bại Thị Trường & Lý Thuyết Trò Chơi', question: "The 'Excess Capacity' in Monopolistic Competition means firms:", options: ["A) Produce LESS than the quantity that minimizes Average Total Cost (ATC).", "B) Produce too much inventory.", "C) Sell below Marginal Cost.", "D) Have broken factories."], correct: 0, explanation: "Downward-sloping demand ensures tangency with ATC occurs on downward slope, before minimum.", trap: "Assuming firms operate at minimum efficient scale." },

            // MACROECONOMICS (Q61 - Q120)
            { id: 61, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "Gross Domestic Product (GDP) is best defined as the market value of:", options: ["A) All intermediate/final goods by citizens.", "B) All final goods/services produced within a country in a given time period.", "C) Financial assets exchanged.", "D) Used and new goods sold."], correct: 1, explanation: "GDP strictly counts final goods and services produced domestically over a specific time frame.", trap: "Including intermediate goods or foreign production." },
            { id: 62, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "In the circular flow of income and expenditure, which identity holds true?", options: ["A) Total Expenditure > Total Income", "B) Total Income = Total Expenditure = Value of Production", "C) Consumption + Saving = Gov Spending", "D) Net Exports = Imports - Exports"], correct: 1, explanation: "Every dollar spent is a dollar of income for someone else, ensuring Y = C + I + G + NX.", trap: "Assuming expenditure and income can persistently diverge." },
            { id: 63, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "The Expenditure Approach to measuring GDP sums up:", options: ["A) Wages, Rent, Interest, Profits.", "B) Consumption, Investment, Government Expenditure, Net Exports.", "C) Taxes, Subsidies, Transfers.", "D) Household Production."], correct: 1, explanation: "The components of the expenditure approach are C, I, G, and NX.", trap: "Confusing Expenditure with the Income Approach." },
            { id: 64, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "Gross National Product (GNP) differs from GDP in that GNP:", options: ["A) Excludes depreciation.", "B) Includes net factor income from abroad.", "C) Ignores the service sector.", "D) Deducts indirect taxes."], correct: 1, explanation: "GNP measures production by residents regardless of location, adding net factor income from abroad.", trap: "Confusing GNP with Net Domestic Product." },
            { id: 65, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "Which of the following is an example of an item EXCLUDED from GDP?", options: ["A) A newly constructed house.", "B) A haircut at a local salon.", "C) The purchase of a 5-year-old used car.", "D) Gov spending on defense."], correct: 2, explanation: "Used goods are excluded because they were counted in the GDP of the year originally produced.", trap: "Assuming all market transactions count towards current GDP." },
            { id: 66, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "Real GDP differs from Nominal GDP because Real GDP:", options: ["A) Includes the underground economy.", "B) Is evaluated at current-year prices.", "C) Removes influence of price changes by using base-year prices.", "D) Only counts tangible goods."], correct: 2, explanation: "Real GDP holds prices constant to measure actual changes in physical production volume.", trap: "Reversing Real and Nominal definitions." },
            { id: 67, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "A statistical discrepancy in the National Accounts arises because:", options: ["A) Income and Expenditure approaches rely on different data sources with minor variance.", "B) Government hides debt.", "C) Depreciation is ignored.", "D) It ignores household production."], correct: 0, explanation: "Measurement errors in data collection cause minor differences between expenditure and income estimates.", trap: "Assuming discrepancy implies intentional fraud." },
            { id: 68, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "Which of the following severely limits Real GDP as a perfect measure of standard of living?", options: ["A) It includes government defense spending.", "B) It ignores value of leisure time and environmental quality.", "C) It uses chaining methods.", "D) It is adjusted for inflation."], correct: 1, explanation: "GDP only measures market transactions, ignoring non-market factors like leisure and environmental health.", trap: "Assuming adjusting for inflation is a limitation." },
            { id: 69, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "The Business Cycle is characterized by four stages:", options: ["A) Inflation, Deflation, Stagflation, Hyperinflation.", "B) Expansion, Peak, Recession, Trough.", "C) Deficit, Surplus, Balance, Default.", "D) Boom, Panic, Crash, Recovery."], correct: 1, explanation: "The cycle involves alternating periods of expansion and recession around potential GDP.", trap: "Using colloquial terms rather than formal macroeconomic stages." },
            { id: 70, domain: 'macro', topic: 'Hạch Toán GDP & Chu Kỳ Kinh Doanh', question: "A recession is technically defined as a period in which:", options: ["A) Real GDP decreases for at least six months (two consecutive quarters).", "B) Inflation rate is negative.", "C) Stock market crashes.", "D) Unemployment hits zero."], correct: 0, explanation: "A standard macroeconomic definition of recession is two consecutive quarters of negative real GDP growth.", trap: "Equating recession solely with deflation or stock market crashes." },

            { id: 71, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "According to the ABS Labour Force Survey, a person is classified as unemployed if they:", options: ["A) Are a full-time student not looking.", "B) Worked 2 hours last week for pay.", "C) Have no employment, are available, and actively looked in last 4 weeks.", "D) Gave up looking."], correct: 2, explanation: "To be officially unemployed, one must be jobless, available, and actively searching.", trap: "Including discouraged workers in the unemployed category." },
            { id: 72, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "The Labour Force is defined as:", options: ["A) The entire working-age population.", "B) Only those currently employed.", "C) The sum of employed and unemployed individuals.", "D) Working-age minus retirees."], correct: 2, explanation: "Labour Force = Employed + Unemployed. It excludes those not seeking work.", trap: "Including those not in the labor force." },
            { id: 73, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "A discouraged job seeker is categorized as:", options: ["A) Unemployed.", "B) Part of the labour force.", "C) Marginally attached and NOT in the labour force.", "D) Cyclically unemployed."], correct: 2, explanation: "Because they stopped actively searching, they drop out of the official labour force entirely.", trap: "Assuming discouraged workers are counted in unemployment rate." },
            { id: 74, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "Underemployment refers to workers who:", options: ["A) Have part-time jobs but want to work full-time hours.", "B) Are entirely jobless.", "C) Refuse minimum wage.", "D) Have retired early."], correct: 0, explanation: "Underemployed workers are employed, but their labor hours are underutilized.", trap: "Confusing underemployment with total unemployment." },
            { id: 75, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "Frictional unemployment arises from:", options: ["A) Technology replacing workers.", "B) Business cycle recessions.", "C) Normal labor turnover, like graduates searching for first job.", "D) Minimum wage laws."], correct: 2, explanation: "Frictional unemployment is short-term, natural job search and matching activity.", trap: "Confusing frictional with structural unemployment." },
            { id: 76, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "When ATMs were introduced, bank tellers lost jobs and required retraining. This is:", options: ["A) Cyclical unemployment.", "B) Frictional unemployment.", "C) Structural unemployment.", "D) Seasonal unemployment."], correct: 2, explanation: "Structural unemployment occurs when technological change permanently alters required skills.", trap: "Assuming technology causes cyclical issues." },
            { id: 77, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "Cyclical unemployment is strictly associated with:", options: ["A) Time to match workers to jobs.", "B) Fluctuations over the business cycle (recessions).", "C) Lack of skills.", "D) Voluntary quitting."], correct: 1, explanation: "Cyclical unemployment rises in recessions and falls during expansions due to AD shifts.", trap: "Confusing cyclical with natural unemployment factors." },
            { id: 78, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "Full employment occurs when:", options: ["A) Unemployment rate is 0%.", "B) Everyone who wants a job has one.", "C) Cyclical unemployment is zero, leaving only frictional and structural.", "D) Inflation is zero."], correct: 2, explanation: "Full employment means operating at the natural rate of unemployment, not zero total unemployment.", trap: "Assuming 0% total unemployment is possible." },
            { id: 79, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "If the unemployment rate is currently ABOVE the natural rate, the Output Gap is:", options: ["A) Positive (Real GDP > Potential).", "B) Negative (Real GDP < Potential).", "C) Zero (Real GDP = Potential).", "D) Unrelated."], correct: 1, explanation: "High unemployment means resources are idle, so actual output is below potential capacity.", trap: "Associating 'above' in unemployment with positive output gaps." },
            { id: 80, domain: 'macro', topic: 'Thị Trường Lao Động & Thất Nghiệp', question: "Potential GDP represents:", options: ["A) Absolute maximum physical capacity 24/7.", "B) Value of real GDP when the economy is at full employment.", "C) Nominal GDP adjusted.", "D) GDP during inflation."], correct: 1, explanation: "Potential GDP is sustainable output when labor is fully employed at the natural rate.", trap: "Equating potential GDP to absolute physical maximum." },

            { id: 81, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "The Consumer Price Index (CPI) measures:", options: ["A) Average prices of all goods in GDP.", "B) Average of prices paid by urban consumers for a fixed market basket.", "C) Wholesale costs.", "D) Exchange rate."], correct: 1, explanation: "CPI tracks a specific fixed basket representative of an average household's consumption.", trap: "Confusing specific CPI basket with broad GDP Deflator." },
            { id: 82, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "If CPI in 2019 was 120 and in 2020 is 140, the inflation rate is:", options: ["A) 14.2%", "B) 16.67%", "C) 20.0%", "D) 120%"], correct: 1, explanation: "Inflation Rate = ((140 - 120) / 120) * 100 = 16.67%.", trap: "Dividing by new CPI (140) instead of base (120)." },
            { id: 83, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "Which of the following is a known source of upward bias in the CPI?", options: ["A) New goods bias.", "B) Quality change bias.", "C) Commodity substitution bias.", "D) All of the above."], correct: 3, explanation: "CPI struggles with new products, quality improvements, and substitution away from expensive items.", trap: "Assuming CPI is a perfectly accurate living cost measure." },
            { id: 84, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "Commodity Substitution Bias occurs because the CPI:", options: ["A) Ignores retail outlet changes.", "B) Uses a fixed basket ignoring consumers substituting away from expensive goods.", "C) Adjusts too fast.", "D) Uses current quantities."], correct: 1, explanation: "Because weights are fixed, CPI overweights items whose prices surged recently.", trap: "Confusing commodity substitution with outlet substitution." },
            { id: 85, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "A major consequence of the CPI's upward bias is that:", options: ["A) Real GDP is vastly overstated.", "B) Gov outlays linked to CPI (pensions) increase faster than true living costs.", "C) Taxes increase rapidly.", "D) RBA ignores inflation."], correct: 1, explanation: "Indexation using an upwardly biased CPI inadvertently raises real payouts, costing governments heavily.", trap: "Assuming upward bias lowers government spending." },
            { id: 86, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "How does the GDP Deflator differ conceptually from the CPI?", options: ["A) It includes only consumer goods.", "B) It uses current-year quantities of all final goods, avoiding substitution bias.", "C) It covers exports.", "D) No difference."], correct: 1, explanation: "Relying on current quantities of everything in GDP, the Deflator naturally accounts for substitution.", trap: "Assuming CPI is broader than GDP Deflator." },
            { id: 87, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "The Trimmed-mean CPI (Core Inflation) is calculated by:", options: ["A) Excluding all food and energy strictly.", "B) Excluding 15% of items whose prices rose fastest and 15% slowest.", "C) Averaging over 5 years.", "D) Deflating wages."], correct: 1, explanation: "The RBA's trimmed-mean removes extreme price movements at both tails to reveal underlying inflation.", trap: "Confusing trimmed-mean with ex-food/energy metric." },
            { id: 88, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "If your Nominal Wage rises by 5% and Inflation is 3%, your Real Wage has:", options: ["A) Decreased by 2%.", "B) Increased by 2%.", "C) Increased by 8%.", "D) Remained unchanged."], correct: 1, explanation: "Real Wage Growth ≈ Nominal Wage Growth - Inflation Rate = 5% - 3% = +2%.", trap: "Adding rates together instead of subtracting inflation." },
            { id: 89, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "The Real Interest Rate is defined as:", options: ["A) Nominal rate + inflation rate.", "B) Nominal rate / CPI.", "C) Nominal interest rate minus the inflation rate.", "D) RBA cash rate."], correct: 2, explanation: "The Real Interest Rate captures the actual gain in purchasing power from lending.", trap: "Adding inflation to nominal rate." },
            { id: 90, domain: 'macro', topic: 'Lạm Phát & Chỉ Số Giá Cả (CPI)', question: "If the Nominal Interest Rate is 4% and Inflation is 6%, the Real Interest Rate is:", options: ["A) 10%", "B) 2%", "C) -2%", "D) 0.67%"], correct: 2, explanation: "Real rate = 4% - 6% = -2%. Lender loses purchasing power.", trap: "Ignoring negative real rates." },

            { id: 91, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "The Aggregate Supply (AS) curve slopes upward because in the short run:", options: ["A) Sticky money wages mean higher prices lower real wages, increasing output.", "B) Tech improves.", "C) Demand falls.", "D) Potential GDP grows."], correct: 0, explanation: "Sticky nominal wages mean higher output prices make production more profitable, expanding supply.", trap: "Assuming potential GDP changes along the curve." },
            { id: 92, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "Which of the following will shift the Aggregate Supply (AS) curve LEFT?", options: ["A) Decrease in money wages.", "B) Increase in money prices of key resources (e.g., oil).", "C) Increase in Potential GDP.", "D) Price level falls."], correct: 1, explanation: "Higher resource costs squeeze profit margins at any given price level, decreasing supply.", trap: "Confusing movement along curve with shift." },
            { id: 93, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "The Aggregate Demand (AD) curve slopes downward due to all EXCEPT:", options: ["A) Wealth effect.", "B) Real interest rate effect.", "C) Real prices of exports/imports.", "D) Substitution effect of domestic goods."], correct: 3, explanation: "AD deals with general price level of all goods, so internal micro substitution is irrelevant.", trap: "Applying micro demand logic (substitutes) to macro aggregates." },
            { id: 94, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "An increase in Expected Future Income will cause:", options: ["A) AD to decrease.", "B) AD to increase (shift right).", "C) AS to increase.", "D) Movement along AD."], correct: 1, explanation: "Optimistic consumers increase current consumption, shifting AD right.", trap: "Assuming future income primarily shifts aggregate supply." },
            { id: 95, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "The Aggregate Demand Multiplier effect implies that:", options: ["A) Initial expenditure increase triggers induced consumption, shifting AD further.", "B) Inflation multiplies.", "C) Taxes > Spending.", "D) GDP caps out."], correct: 0, explanation: "A boost in expenditure raises incomes, inducing secondary rounds of consumption.", trap: "Ignoring induced consumption ripple effect." },
            { id: 96, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "A Recessionary Gap occurs when:", options: ["A) Real GDP > Potential GDP.", "B) Macro equilibrium is at a Real GDP below Potential GDP.", "C) AD shifts right excessively.", "D) Unemployment is below natural rate."], correct: 1, explanation: "A recessionary gap means operating below full employment capacity.", trap: "Confusing with inflationary gap." },
            { id: 97, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "During an Inflationary Gap, the labor market experiences a:", options: ["A) Surplus of labor, wages down.", "B) Shortage of labor, pushing money wages up.", "C) Zero unemployment.", "D) Massive structural shift."], correct: 1, explanation: "Firms compete for scarce labor, driving up nominal wages and shifting AS left.", trap: "Assuming wages fall during economic boom." },
            { id: 98, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "Demand-Pull Inflation is initiated by:", options: ["A) Persistent AD increase.", "B) Sudden oil price hike.", "C) Minimum wage cut.", "D) Tax increase."], correct: 0, explanation: "Demand-pull starts with AD shifting right, sustained if central bank prints money.", trap: "Confusing with cost-push inflation." },
            { id: 99, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "Cost-Push Inflation (Stagflation) is triggered by:", options: ["A) Gov spending increase.", "B) Decrease in aggregate supply (higher resource costs).", "C) Export boom.", "D) Tech breakthrough."], correct: 1, explanation: "A leftward shift of AS raises price level while shrinking output, creating stagflation.", trap: "Assuming inflation is always accompanied by high growth." },
            { id: 100, domain: 'macro', topic: 'Mô Hình AS-AD & Số Nhân', question: "In a recessionary gap, the self-correcting long-run adjustment involves:", options: ["A) Money wages falling, shifting AS right until full employment.", "B) Wages rising.", "C) AD shifting left automatically.", "D) Government doing nothing forever."], correct: 0, explanation: "High unemployment forces nominal wages down, lowering costs and shifting AS outward.", trap: "Assuming wages are perfectly rigid in long run." },

            { id: 101, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "The Australian Government Budget has two main purposes:", options: ["A) Control cash rate.", "B) Finance gov activities and achieve macro objectives via Fiscal Policy.", "C) Regulate tariffs.", "D) Set profit margins."], correct: 1, explanation: "Fiscal policy relies on taxes and government spending to fund services and steer economy.", trap: "Confusing fiscal responsibilities with monetary policy." },
            { id: 102, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "A Structural Deficit occurs when:", options: ["A) Deficit is due to temporary recession.", "B) Budget is in deficit even if economy operates at full employment.", "C) Exports > Imports.", "D) Taxes spike."], correct: 1, explanation: "A structural deficit indicates underlying spending/tax imbalances independent of cycle.", trap: "Confusing structural deficits with cyclical deficits." },
            { id: 103, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "Automatic Stabilizers refer to:", options: ["A) Parliament passing stimulus.", "B) RBA cutting rates.", "C) Induced taxes and spending (welfare) that automatically dampen business cycle.", "D) Fixed infrastructure spending."], correct: 2, explanation: "Tax revenues naturally fall and welfare payments rise in recession, dampening downturns.", trap: "Confusing automatic stabilizers with discretionary fiscal policy." },
            { id: 104, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "The Keynesian view on Fiscal Stimulus argues that:", options: ["A) Stimulus crowds out private investment.", "B) Gov spending increases AD with a multiplier effect, saving jobs.", "C) Only monetary works.", "D) Markets self-correct instantly."], correct: 1, explanation: "Keynesians advocate active deficit spending to boost AD and mitigate recessions.", trap: "Confusing Keynesian with Classical non-interventionism." },
            { id: 105, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "According to the 'Crowding Out' effect (Mainstream view):", options: ["A) Deficit spending raises real interest rates, reducing private investment.", "B) Higher taxes encourage spending.", "C) Gov spending stimulates business.", "D) RBA lowers rates too much."], correct: 0, explanation: "Government borrowing competes with private borrowing, driving up interest rates.", trap: "Assuming crowding out is a positive effect." },
            { id: 106, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "Why is the Government Expenditure Multiplier generally LARGER than Tax Multiplier?", options: ["A) Taxes are illegal.", "B) $1 in G directly injects $1 into AD; $1 tax cut results in less than $1 spending (some saved).", "C) G is always efficient.", "D) Rich pay taxes."], correct: 1, explanation: "Initial impact of a tax cut is diluted by marginal propensity to save.", trap: "Assuming tax cuts translate 1:1 into consumption." },
            { id: 107, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "A severe demographic shift (aging 'Baby Boomers') creates long-term fiscal challenge because:", options: ["A) RBA can't lower rates.", "B) Working-age tax base shrinks while pension/healthcare expenses expand.", "C) Inflation hits zero.", "D) Imports stop."], correct: 1, explanation: "Intergenerational Report highlights aging population structurally increases outlays while constraining taxes.", trap: "Attributing demographic fiscal issues to short-term monetary policy." },
            { id: 108, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "Supply-Side Fiscal Policy emphasizes that an increase in income tax rates will:", options: ["A) Increase labor supply.", "B) Shift potential GDP right.", "C) Drive a larger tax wedge, decreasing labor supply and lowering Potential GDP.", "D) Have zero effect."], correct: 2, explanation: "High taxes reduce after-tax real wage, disincentivizing work and investment.", trap: "Ignoring disincentive effects of high marginal taxes." },
            { id: 109, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "If government simultaneously increases G by $10B and taxes by $10B (Balanced Budget Multiplier):", options: ["A) AD will not change.", "B) AD decreases.", "C) AD increases because G-multiplier > Tax-multiplier.", "D) Rates drop to zero."], correct: 2, explanation: "Because G multiplier > Tax multiplier, an equal increase yields net positive effect on AD.", trap: "Assuming effects cancel out exactly to zero." },
            { id: 110, domain: 'macro', topic: 'Chính Sách Tài Khóa & Ngân Sách', question: "A major limitation of Discretionary Fiscal Policy is:", options: ["A) Time lags (law-making takes time, potentially arriving too late).", "B) Responds too instantly.", "C) Controlled by RBA.", "D) Ignores AD."], correct: 0, explanation: "Legislative process causes recognition, decision, and implementation lags.", trap: "Assuming fiscal policy is swift and agile." },

            { id: 111, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "The primary objective of the Reserve Bank of Australia (RBA) regarding inflation is to:", options: ["A) Maintain 0% inflation.", "B) Target consumer price inflation between 2 and 3 per cent, on average, over cycle.", "C) Keep inflation below 1%.", "D) Ignore inflation."], correct: 1, explanation: "The RBA explicitly uses flexible inflation targeting (2-3% on average) to anchor expectations.", trap: "Assuming mandate is zero inflation." },
            { id: 112, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "The monetary policy instrument chosen by the RBA to achieve its goals is:", options: ["A) Income tax rate.", "B) Exchange rate.", "C) The Cash Rate.", "D) Gold reserves."], correct: 2, explanation: "The RBA targets the cash rate—interest rate on overnight interbank loans.", trap: "Confusing cash rate with exchange rate targeting." },
            { id: 113, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "To LOWER the Cash Rate, the RBA must:", options: ["A) Sell gov securities.", "B) Buy gov securities in open market operations, increasing bank reserves.", "C) Order banks to lower rates.", "D) Increase reserve requirements."], correct: 1, explanation: "Buying securities injects liquidity (reserves) into banking system, driving cash rate down.", trap: "Confusing buying bonds (easing) with selling bonds (tightening)." },
            { id: 114, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "When the RBA LOWERS the cash rate target, the transmission mechanism works by:", options: ["A) Lowering real interest rates, increasing investment/consumption, shifting AD right.", "B) Raising real rates.", "C) Increasing Gov spending directly.", "D) Decreasing loanable funds."], correct: 0, explanation: "Cheaper borrowing costs stimulate private investment and durable consumption, boosting AD.", trap: "Assuming rate cuts decrease AD." },
            { id: 115, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "When the RBA RAISES the cash rate, a secondary effect on the foreign exchange market is that:", options: ["A) AUD depreciates, boosting exports.", "B) AUD appreciates, decreasing net exports.", "C) Imports become pricier.", "D) Unaffected."], correct: 1, explanation: "Higher interest rates attract foreign capital, appreciating AUD and decreasing net exports.", trap: "Assuming higher rates depreciate domestic currency." },
            { id: 116, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "The Taylor Rule is an 'Instrument Rule' suggesting central bank adjusts interest rates based on:", options: ["A) Stock market.", "B) Current inflation rate and output gap.", "C) Neighboring unemployment.", "D) Moon phases."], correct: 1, explanation: "Taylor Rule systematically links policy rate to deviations of inflation and output gaps.", trap: "Assuming RBA targets stock market indices." },
            { id: 117, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "A known limitation of Monetary Policy is the 'Long and Variable Lag'. Cash rate impact takes approx:", options: ["A) 1 week.", "B) 1 month.", "C) 6 months.", "D) 2 years for full inflation impact."], correct: 3, explanation: "Monetary policy affects real GDP in about 1 year, but full inflation impact takes ~2 years.", trap: "Assuming instantaneous policy effects on prices." },
            { id: 118, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "In context of RBA's inflation target, 'Consumer price inflation' is assessed using:", options: ["A) Raw Headline CPI.", "B) Trimmed-mean CPI (Core inflation).", "C) GDP Deflator.", "D) Wage Price Index."], correct: 1, explanation: "RBA prefers trimmed-mean CPI as it strips volatile price swings to reveal underlying trend.", trap: "Assuming RBA strictly targets raw headline CPI." },
            { id: 119, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "If the economy is operating with an Inflationary Gap, the RBA's appropriate response is to:", options: ["A) Buy bonds to increase money supply.", "B) Sell bonds to decrease bank reserves and raise cash rate.", "C) Cut taxes.", "D) Print more money."], correct: 1, explanation: "To cool inflation, RBA tightens policy by selling bonds, raising cash rate to suppress AD.", trap: "Applying expansionary policy to inflationary gap." },
            { id: 120, domain: 'macro', topic: 'Chính Sách Tiền Tệ & RBA', question: "During the 2008 Global Financial Crisis, the RBA prevented severe recession in Australia by:", options: ["A) Raising cash rate.", "B) Rapidly cutting cash rate target and increasing monetary base liquidity.", "C) Adopting Gold Standard.", "D) Mandating balanced budgets."], correct: 1, explanation: "RBA slashed rates from 7% to 3% and injected liquidity to stabilize financial system and boost AD.", trap: "Assuming tightening was crisis response." }
        ];
const App = () => {
  const [quizMode, setQuizMode] = useState('practice');
  const [quizTopic, setQuizTopic] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [chatStates, setChatStates] = useState({});
  const questionsPerPage = 10;
  
  const chatHistoryRefs = useRef({});

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        if (timeLeft <= 1) {
          setTimeLeft(0);
          setTimerActive(false);
          setExamSubmitted(true);
          alert("Time is up! Your answers have been submitted.");
        } else {
          setTimeLeft((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const getFilteredQuestions = () => {
    if (quizTopic === 'all') return quizDataset;
    const topicMap = {
      'topic1': [1, 20],
      'topic2': [21, 40],
      'topic3': [41, 60],
      'topic4': [61, 80],
      'topic5': [81, 100],
      'topic6': [101, 120]
    };
    const range = topicMap[quizTopic];
    return quizDataset.filter(q => q.id >= range[0] && q.id <= range[1]);
  };

  const handleModeChange = (mode) => {
    setQuizMode(mode);
    setUserAnswers({});
    setCurrentPage(0);
    setExamSubmitted(false);
    if (mode === 'exam') {
      setTimeLeft(120 * 60);
      setTimerActive(true);
      setQuizTopic('all'); // Exam should ideally be all topics
    } else {
      setTimerActive(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (qId, optIdx) => {
    if (examSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleExamSubmit = () => {
    setTimerActive(false);
    setExamSubmitted(true);
  };

  const handleChatToggle = (qId) => {
    setChatStates(prev => ({
      ...prev,
      [qId]: { ...prev[qId], isOpen: !prev[qId]?.isOpen }
    }));
  };

  const handleChatInput = (qId, val) => {
    setChatStates(prev => ({
      ...prev,
      [qId]: { ...prev[qId], input: val }
    }));
  };

  const sendAiMessage = async (questionData) => {
    const qId = questionData.id;
    const currentState = chatStates[qId] || {};
    const message = currentState.input?.trim();
    
    if (!message) return;

    const newHistory = [...(currentState.history || []), { role: 'user', text: message }];
    
    setChatStates(prev => ({
      ...prev,
      [qId]: { ...prev[qId], history: newHistory, input: '', isLoading: true, isOpen: true }
    }));

    // Scroll to bottom
    setTimeout(() => {
        if(chatHistoryRefs.current[qId]) {
            chatHistoryRefs.current[qId].scrollTop = chatHistoryRefs.current[qId].scrollHeight;
        }
    }, 50);

    const systemPrompt = `You are a helpful, expert tutor for a University Microeconomics course. 
The user is working on a multiple-choice quiz and needs clarification.
Question Context:
- Question: ${questionData.q}
- Options: ${questionData.opts.join(' | ')}
- Correct Answer: Option ${String.fromCharCode(65 + questionData.c)}
- Official Explanation: ${questionData.exp}
- Associated Trap/Concept: ${questionData.trap}

Provide a concise, clear, and academic explanation in English. Address the user's specific query based on this context. Do not give away the answer immediately if they are just asking for a hint, but explain the concept thoroughly.`;

    try {
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("API Error");
      
      const result = await response.json();
      const aiResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

      setChatStates(prev => ({
        ...prev,
        [qId]: { 
          ...prev[qId], 
          isLoading: false, 
          history: [...prev[qId].history, { role: 'model', text: aiResponseText }] 
        }
      }));

    } catch (error) {
      console.error(error);
      setChatStates(prev => ({
        ...prev,
        [qId]: { 
          ...prev[qId], 
          isLoading: false, 
          history: [...prev[qId].history, { role: 'model', text: "Error connecting to AI Tutor. Please try again." }] 
        }
      }));
    }

    setTimeout(() => {
        if(chatHistoryRefs.current[qId]) {
            chatHistoryRefs.current[qId].scrollTop = chatHistoryRefs.current[qId].scrollHeight;
        }
    }, 50);
  };

  const filteredQs = getFilteredQuestions();
  const totalPages = Math.ceil(filteredQs.length / questionsPerPage);
  const currentQs = filteredQs.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);
  const progressPct = Math.min(100, Math.round((Object.keys(userAnswers).length / quizDataset.length) * 100));
  const examScore = quizDataset.reduce(
    (score, question) => score + (userAnswers[question.id] === question.c ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-teal-700 text-white font-bold text-xl flex items-center justify-center shadow">
                <Target size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">ECON910: Mock Exam Hub</h1>
                <p className="text-xs text-slate-500">120-Question Microeconomics Test Bank</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                <BookOpen className="text-teal-600" size={24} />
                <span>Microeconomics Question Bank</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1">Train your academic reflexes by topic or run a timed mock exam.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex space-x-1 text-xs">
                <button 
                  onClick={() => handleModeChange('practice')} 
                  className={`px-3 py-1.5 rounded font-bold transition ${quizMode === 'practice' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  Practice Mode
                </button>
                <button 
                  onClick={() => handleModeChange('exam')} 
                  className={`px-3 py-1.5 rounded font-bold transition ${quizMode === 'exam' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  Mock Exam
                </button>
              </div>

              {quizMode === 'exam' && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1">
                  <Clock size={16} /> <span>{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-bold text-slate-600">Filter by Topic:</span>
              <select 
                value={quizTopic} 
                onChange={(e) => { setQuizTopic(e.target.value); setCurrentPage(0); }} 
                className="bg-slate-50 border border-slate-300 text-slate-800 rounded p-1.5 focus:ring-teal-600 text-xs disabled:opacity-50"
                disabled={quizMode === 'exam'}
              >
                <option value="all">All 120 Questions (Chapters 1 - 13)</option>
                <option value="topic1">Topic 1: Scarcity, Opportunity Cost & PPF (20 Qs)</option>
                <option value="topic2">Topic 2: Supply, Demand & Interventions (20 Qs)</option>
                <option value="topic3">Topic 3: Elasticity & Revenue (20 Qs)</option>
                <option value="topic4">Topic 4: Consumer Behavior & Utility (20 Qs)</option>
                <option value="topic5">Topic 5: Production Costs & Perfect Competition (20 Qs)</option>
                <option value="topic6">Topic 6: Monopoly, Oligopoly & Market Failure (20 Qs)</option>
              </select>
            </div>

            <div className="text-xs text-slate-500">
              Showing: <span className="font-bold text-slate-800">{filteredQs.length}</span> | Answered: <span className="font-bold text-teal-700">{Object.keys(userAnswers).length}</span>/{quizDataset.length}
            </div>
          </div>

          {/* Progress */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
            <div className="bg-teal-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }}></div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {currentQs.map((q) => {
              const userSel = userAnswers[q.id];
              const isAnswered = userSel !== undefined;
              const chatState = chatStates[q.id] || {};

              return (
                <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/30 shadow-sm transition hover:shadow-md">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug text-left">
                      <span className="text-teal-700 mr-1">Q{q.id}:</span> {q.question}
                    </h4>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-semibold px-2 py-1 rounded whitespace-nowrap">Topic {Math.ceil(q.id/20)}</span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let btnClass = "w-full text-left border rounded-lg p-3 text-xs cursor-pointer transition flex items-start space-x-2 ";
                      
                      if (isAnswered) {
                        if (quizMode === 'practice') {
                          if (optIdx === q.correct) btnClass += "border-green-500 bg-green-50 font-semibold";
                          else if (userSel === optIdx) btnClass += "border-red-400 bg-red-50";
                          else btnClass += "border-slate-200 bg-white opacity-60";
                        } else {
                           if (userSel === optIdx) btnClass += "border-teal-600 bg-teal-50";
                           else btnClass += "border-slate-200 bg-white";
                        }
                      } else {
                        btnClass += "border-slate-200 bg-white hover:bg-slate-100";
                      }

                      return (
                        <button key={optIdx} onClick={() => handleAnswerSelect(q.id, optIdx)} className={btnClass} disabled={examSubmitted || (quizMode === 'practice' && isAnswered)}>
                          {quizMode === 'practice' && isAnswered && optIdx === q.correct && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                          {quizMode === 'practice' && isAnswered && userSel === optIdx && optIdx !== q.correct && <XCircle size={16} className="text-red-500 shrink-0" />}
                          {(!isAnswered || quizMode === 'exam' || (isAnswered && quizMode === 'practice' && optIdx !== q.correct && userSel !== optIdx)) && (
                              <span className="font-bold text-slate-400 shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                          )}
                          <span className="text-slate-700">{opt.substring(3)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizMode === 'practice' && isAnswered && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                      <div className="p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-lg text-xs text-teal-900 space-y-2 text-left">
                        <div className="font-bold text-teal-800 flex items-center justify-between">
                          <span className="flex items-center gap-1"><BookOpen size={14}/> Explanation:</span>
                          <span className="bg-teal-200 text-teal-900 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{q.trap}</span>
                        </div>
                        <p className="leading-relaxed text-left">{q.explanation}</p>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={() => handleChatToggle(q.id)}
                          disabled
                          className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1 bg-white border border-teal-200 px-3 py-1.5 rounded-full shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-teal-700"
                        >
                          <MessageSquare size={14} /> <span>Ask AI Tutor</span>
                        </button>

                        {chatState.isOpen && (
                          <div className="mt-3 border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col h-64 shadow-inner">
                            <div 
                              ref={el => chatHistoryRefs.current[q.id] = el}
                              className="flex-grow overflow-y-auto p-3 space-y-3 bg-slate-50"
                            >
                              <div className="text-xs p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 mr-8 shadow-sm">
                                Hello! I'm your AI Microeconomics Tutor. What part of this question or concept would you like me to clarify?
                              </div>
                              {chatState.history?.map((msg, i) => (
                                <div key={i} className={`text-xs p-2.5 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-sky-100 text-sky-900 ml-8 border border-sky-200' : 'bg-white border border-slate-200 text-slate-700 mr-8'}`}>
                                  {msg.text}
                                </div>
                              ))}
                              {chatState.isLoading && (
                                <div className="text-xs p-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 mr-8 flex items-center gap-2 w-fit">
                                  <Loader2 size={12} className="animate-spin" /> Thinking...
                                </div>
                              )}
                            </div>
                            <div className="p-2 bg-white border-t border-slate-200 flex gap-2">
                              <input 
                                type="text" 
                                value={chatState.input || ''}
                                onChange={(e) => handleChatInput(q.id, e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendAiMessage(q)}
                                placeholder="Type your question..." 
                                className="flex-grow text-xs p-2 bg-slate-100 border-none rounded focus:ring-2 focus:ring-teal-500 outline-none"
                              />
                              <button 
                                onClick={() => sendAiMessage(q)}
                                disabled={chatState.isLoading || !chatState.input?.trim()}
                                className="bg-teal-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-teal-700 disabled:opacity-50 transition"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))} 
              disabled={currentPage === 0} 
              className="px-4 py-2 flex items-center gap-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 disabled:opacity-40 transition"
            >
              <ChevronLeft size={16}/> Previous
            </button>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Page {currentPage + 1} of {totalPages || 1}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} 
              disabled={currentPage >= totalPages - 1} 
              className="px-4 py-2 flex items-center gap-1 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 disabled:opacity-40 transition"
            >
              Next <ChevronRight size={16}/>
            </button>
          </div>

          {quizMode === 'exam' && (
            <div className="mt-5 flex flex-col items-end gap-3">
              {examSubmitted && (
                <p className="w-full rounded-lg bg-teal-50 border border-teal-200 px-4 py-3 text-sm font-semibold text-teal-800 text-left">
                  Exam submitted — Score: {examScore}/{quizDataset.length} ({Object.keys(userAnswers).length} answered)
                </p>
              )}
              {!examSubmitted && (
                <button
                  onClick={handleExamSubmit}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition"
                >
                  Submit Exam
                </button>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;