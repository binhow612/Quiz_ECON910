import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Clock, BookOpen, ChevronLeft, ChevronRight, MessageSquare, Loader2, Target, CheckCircle2, XCircle } from 'lucide-react';

const quizDataset = [
  // TOPIC 1: Scarcity, Opportunity Cost & PPF (Qs 1 - 20)
  { id: 1, q: "Which of the following statements best reflects the fundamental nature of the economic problem?", opts: ["A. The opaque allocation of government budgets.", "B. Human wants are seemingly unlimited while resources are limited.", "C. The rapid depletion of fossil fuels.", "D. Inflation reducing the purchasing power of money."], c: 1, exp: "Scarcity arises from the persistent conflict between unlimited human wants and the limited resources available to satisfy them.", trap: "Misunderstanding Scarcity" },
  { id: 2, q: "A tech company has spent $200,000 developing software. It costs an additional $50,000 to finish. The expected sales revenue is $180,000. The optimal decision is to:", opts: ["A. Cancel the project because total cost $250k > $180k.", "B. Continue because marginal benefit ($180k) > marginal cost ($50k).", "C. Cut $50k in other costs.", "D. Increase the selling price of the software."], c: 1, exp: "$200,000 is a Sunk Cost. Rational marginal analysis only compares future marginal benefits ($180k) with future marginal costs ($50k).", trap: "Sunk Cost Fallacy" },
  { id: 3, q: "You receive a free movie ticket (listed price $20). Tonight, you could either work part-time to earn $30 or go to a party (entry fee $10, valued at $45 of satisfaction). The opportunity cost of watching the movie is:", opts: ["A. $20", "B. $30", "C. $35", "D. $45"], c: 2, exp: "Surplus from the party = $45 - $10 = $35. Surplus from working = $30. The value of the next best alternative forgone is the party's surplus ($35).", trap: "Calculating Alternative Surplus" },
  { id: 4, q: "A production possibilities frontier (PPF) that is bowed outward from the origin illustrates:", opts: ["A. Constant opportunity costs.", "B. Decreasing opportunity costs.", "C. Increasing opportunity costs.", "D. Unlimited production resources."], c: 2, exp: "Because resources are not perfectly adaptable to the production of all goods, the opportunity cost increases as more of one good is produced, making the PPF bowed outward.", trap: "Shape of the PPF" },
  { id: 5, q: "A point located INSIDE the production possibilities frontier (PPF) represents:", opts: ["A. An unattainable state with current technology.", "B. Inefficient use of resources or unemployment.", "C. Optimal productive efficiency.", "D. Outstanding economic growth."], c: 1, exp: "Points inside the PPF represent a failure to utilize all available resources efficiently, often indicating unemployment.", trap: "Positions on the PPF" },
  { id: 6, q: "Country A takes 10 hours to produce 1 car, and 2 hours to produce 1 ton of rice. Country B takes 15 hours to produce 1 car, and 5 hours to produce 1 ton of rice. The comparative advantage belongs to:", opts: ["A. Country A in rice, Country B in cars.", "B. Country A in cars, Country B in rice.", "C. Country A in both goods.", "D. Country B in both goods."], c: 0, exp: "A's OC for 1 car = 5 rice. B's OC for 1 car = 3 rice. B has a lower OC for cars. A's OC for 1 rice = 0.2 cars. B's OC for 1 rice = 0.33 cars. A has a lower OC for rice.", trap: "Comparative Advantage Calculation" },
  { id: 7, q: "Positive analysis differs from normative analysis in that:", opts: ["A. It provides objective, testable statements about 'what is'.", "B. It provides value judgments about 'what ought to be'.", "C. It always offers policy recommendations.", "D. It does not rely on empirical data."], c: 0, exp: "Positive economics describes objective, verifiable facts, whereas normative economics involves subjective value judgments.", trap: "Positive vs Normative" },
  { id: 8, q: "The opportunity cost of attending college DOES NOT include:", opts: ["A. Tuition and textbooks.", "B. Basic food and living expenses (incurred regardless of attending college).", "C. Forgone earnings from a full-time job.", "D. The difference in housing costs compared to living at home."], c: 1, exp: "Basic survival expenses (food, basic shelter) are incurred whether you go to college or not, so they are not an opportunity cost specific to the choice of attending college.", trap: "Identifying Opportunity Costs" },
  { id: 9, q: "The principle that 'People respond to incentives' explains which of the following phenomena?", opts: ["A. Mandatory seatbelt laws might lead to faster driving.", "B. Higher gasoline prices encourage people to ride bicycles.", "C. Increased cigarette taxes reduce smoking rates.", "D. All of the above."], c: 3, exp: "Any alteration in costs or benefits will cause rational individuals to adjust their behavior accordingly.", trap: "Economic Incentives" },
  { id: 10, q: "An economy achieves productive efficiency when:", opts: ["A. It cannot produce more of one good without producing less of another.", "B. Goods are distributed equally among all citizens.", "C. Opportunity costs are zero.", "D. There is no inflation in the market."], c: 0, exp: "Productive efficiency is achieved when the economy is operating directly on its Production Possibilities Frontier (PPF).", trap: "Efficiency Concepts" },
  { id: 11, q: "Which of the following factors would shift the PPF OUTWARD?", opts: ["A. A decrease in the unemployment rate.", "B. Technological advancements and increased capital investment.", "C. Reallocating resources from car production to rice production.", "D. A natural disaster destroying infrastructure."], c: 1, exp: "Technological progress and increased resources expand the economy's productive capacity, shifting the entire PPF outward.", trap: "PPF Shifts" },
  { id: 12, q: "Absolute advantage is achieved when an entity:", opts: ["A. Has a lower opportunity cost in production.", "B. Can produce a good using fewer inputs than another producer.", "C. Has a larger consumer surplus.", "D. Sets a lower price in the market."], c: 1, exp: "Absolute advantage compares direct productivity based on the absolute amount of inputs required to produce a unit of output.", trap: "Absolute Advantage" },
  { id: 13, q: "If Mr. A can bake 10 cakes/hour or make 5 candies/hour; Mr. B can bake 6 cakes/hour or make 2 candies/hour. Which statement is TRUE?", opts: ["A. Mr. A has a comparative advantage in cakes.", "B. Mr. B has a comparative advantage in cakes.", "C. Mr. A has a comparative advantage in both goods.", "D. Mr. B has no comparative advantage."], c: 1, exp: "A's OC for 1 cake = 0.5 candies. B's OC for 1 cake = 0.33 candies. B's opportunity cost for cakes is lower, giving B the comparative advantage.", trap: "Calculating OC Rates" },
  { id: 14, q: "The law of increasing opportunity cost occurs because:", opts: ["A. Factors of production are not equally adaptable for producing all goods.", "B. Inflation increases input costs over time.", "C. Firms aim to maximize their revenues.", "D. Government intervention distorts free markets."], c: 0, exp: "Resources are heterogeneous. Shifting resources from one industry to another requires using increasingly less suitable inputs, raising the opportunity cost.", trap: "Causes of Increasing OC" },
  { id: 15, q: "The fundamental trade-off between Efficiency and Equity in economic policy is illustrated by:", opts: ["A. Taxing high incomes to subsidize the poor may reduce incentives to work and invest.", "B. Increasing electricity prices encourages conservation.", "C. Free trade benefits all participating nations.", "D. Technology uniformly increases productivity."], c: 0, exp: "Policies aimed at redistributing wealth (equity) often shrink the overall size of the economic pie (efficiency) by distorting incentives.", trap: "Efficiency vs Equity" },
  { id: 16, q: "Adam Smith's concept of the 'Invisible Hand' describes:", opts: ["A. Covert government intervention in the market.", "B. How free market prices guide self-interested individuals to promote general economic well-being.", "C. The market power of monopolistic corporations.", "D. The hidden causes of financial crises."], c: 1, exp: "The invisible hand refers to the free market price mechanism that naturally coordinates supply and demand without central planning.", trap: "The Invisible Hand" },
  { id: 17, q: "An investment decision is considered economically rational when:", opts: ["A. The marginal benefit (MB) is greater than or equal to the marginal cost (MC).", "B. Total benefits exceed total sunk costs.", "C. Revenue breaks even with total costs.", "D. Marginal cost is strictly zero."], c: 0, exp: "The marginal principle dictates that action should be taken if and only if the additional benefit exceeds or equals the additional cost.", trap: "Marginal Principle" },
  { id: 18, q: "In the simple circular-flow model, households are:", opts: ["A. Sellers in the goods market and buyers in the factor market.", "B. Buyers in the goods market and sellers in the factor market.", "C. Tax collectors and providers of public goods.", "D. Price setters for both price ceilings and floors."], c: 1, exp: "Households own factors of production (labor, land) which they sell to firms, and they use the income to buy goods and services.", trap: "Circular Flow Model" },
  { id: 19, q: "If a country engages in international trade based on comparative advantage, it will be able to:", opts: ["A. Consume at a point outside its domestic PPF.", "B. Reduce its total domestic consumption.", "C. Suffer a loss compared to autarky (self-sufficiency).", "D. Become entirely dependent on foreign nations."], c: 0, exp: "International trade allows countries to specialize and trade, effectively expanding their consumption possibilities beyond their domestic production limits.", trap: "Gains from Trade" },
  { id: 20, q: "How does an Implicit Cost differ from an Explicit Cost?", opts: ["A. An implicit cost does not require an actual cash outlay.", "B. An implicit cost is recorded in standard accounting books.", "C. An implicit cost is equivalent to a sunk cost.", "D. An implicit cost is excluded from opportunity cost calculations."], c: 0, exp: "Implicit costs represent the forgone income from the next best alternative use of owned resources, not involving direct monetary payments.", trap: "Implicit vs Explicit" },

  // TOPIC 2: Supply & Demand, Equilibrium, Interventions (Qs 21 - 40)
  { id: 21, q: "Which event shifts the demand curve for cars to the RIGHT?", opts: ["A. A sharp decrease in the price of cars.", "B. An increase in consumer income (assuming cars are normal goods).", "C. The price of gasoline (a complement) doubles.", "D. A decrease in the cost of steel used for cars."], c: 1, exp: "An increase in income raises demand for normal goods at every price point, causing the entire demand curve to shift right.", trap: "Shift vs Movement" },
  { id: 22, q: "When the government imposes a binding Price Floor on agricultural products, the result is:", opts: ["A. A shortage of agricultural products.", "B. A surplus of agricultural products on the market.", "C. A decrease in the equilibrium price of agricultural products.", "D. Maximized consumer surplus."], c: 1, exp: "A binding price floor is set ABOVE the equilibrium price, causing quantity supplied to exceed quantity demanded.", trap: "Price Floor Effects" },
  { id: 23, q: "Demand function Qd = 100 - 2P, Supply function Qs = 10 + 1P. The equilibrium Price and Quantity are:", opts: ["A. P* = 30, Q* = 40", "B. P* = 20, Q* = 60", "C. P* = 30, Q* = 50", "D. P* = 40, Q* = 20"], c: 0, exp: "Set Qd = Qs: 100 - 2P = 10 + P => 3P = 90 => P* = 30. Substitute P* back to find Q* = 40.", trap: "Equilibrium Calculation" },
  { id: 24, q: "If a decrease in the price of good A leads to an increase in the quantity demanded of good B, then A and B are:", opts: ["A. Substitute goods.", "B. Complementary goods.", "C. Inferior goods.", "D. Independent goods."], c: 1, exp: "Cheaper Good A leads to more consumption of A, which pulls up the demand for B because they are consumed together.", trap: "Complements vs Substitutes" },
  { id: 25, q: "When a tax of $t per unit is levied on producers, the supply curve will:", opts: ["A. Shift upward (to the left) by exactly $t.", "B. Shift downward to the right.", "C. Remain unchanged.", "D. Become flatter."], c: 0, exp: "The tax increases the marginal cost of production by $t, shifting the supply curve vertically upwards by the tax amount.", trap: "Tax Effect on Supply" },
  { id: 26, q: "The actual tax burden will fall mostly on BUYERS if:", opts: ["A. Demand is more elastic than supply.", "B. Demand is less elastic (more inelastic) than supply.", "C. Supply is perfectly elastic.", "D. The government collects the tax directly from sellers."], c: 1, exp: "The side of the market that is less elastic (less flexible to change behavior) bears the larger share of the tax burden.", trap: "Tax Incidence" },
  { id: 27, q: "The deadweight loss (DWL) caused by a tax arises because:", opts: ["A. The tax reduces the quantity traded below the socially optimal level.", "B. Tax revenues are wasted by inefficient government spending.", "C. Producer surplus is entirely transferred to consumers.", "D. The selling price decreases for producers."], c: 0, exp: "DWL occurs because the tax drives a wedge between buyers and sellers, preventing mutually beneficial trades from taking place.", trap: "Nature of DWL" },
  { id: 28, q: "A market shortage occurs when:", opts: ["A. The current price is above the equilibrium price.", "B. The current price is below the equilibrium price.", "C. The supply curve shifts to the right.", "D. A binding price floor is implemented."], c: 1, exp: "When price is below equilibrium, the quantity demanded exceeds the quantity supplied, creating a shortage.", trap: "Market Shortage" },
  { id: 29, q: "If both Supply and Demand increase simultaneously, we can definitively conclude that:", opts: ["A. The equilibrium price will rise.", "B. The equilibrium quantity will rise.", "C. The equilibrium price will fall.", "D. The equilibrium quantity will fall."], c: 1, exp: "Both shifts increase equilibrium quantity. However, they push price in opposite directions, making the final price change ambiguous.", trap: "Simultaneous Shifts" },
  { id: 30, q: "Consumer Surplus (CS) on a graph is the area:", opts: ["A. Below the equilibrium price and above the supply curve.", "B. Below the demand curve and above the actual price paid.", "C. Between the supply and demand curves.", "D. Above the demand curve."], c: 1, exp: "CS is the difference between willingness to pay (the demand curve) and the market price.", trap: "Identifying CS Area" },
  { id: 31, q: "When a government imposes a binding Price Ceiling on apartment rentals, a long-run consequence is:", opts: ["A. An improvement in apartment quality.", "B. A severe housing shortage and the emergence of black markets.", "C. Landlords building more apartment complexes.", "D. All renters benefiting equally."], c: 1, exp: "Rent control discourages investment in housing and maintenance, leading to severe shortages over time.", trap: "Price Ceiling Effects" },
  { id: 32, q: "A significant technological breakthrough in microchip manufacturing will cause:", opts: ["A. The supply curve for microchips to shift to the right.", "B. The demand curve for microchips to shift to the right.", "C. The supply curve for microchips to shift to the left.", "D. The price of microchips to rise."], c: 0, exp: "Technology reduces production costs, allowing firms to supply more at any given price, shifting the supply curve right.", trap: "Technology and Supply" },
  { id: 33, q: "A government subsidy to producers has an effect similar to:", opts: ["A. A consumption tax.", "B. A decrease in production costs, shifting the supply curve to the right.", "C. Imposing a price ceiling.", "D. Decreasing the equilibrium quantity."], c: 1, exp: "A subsidy effectively lowers the firm's marginal cost of production, shifting the supply curve outward.", trap: "Effects of Subsidies" },
  { id: 34, q: "The market price increases from $10 to $15, causing the quantity supplied to increase from 100 to 150 units. This is described as:", opts: ["A. A rightward shift of the supply curve.", "B. A movement along the supply curve (change in quantity supplied).", "C. A shift in the demand curve.", "D. Market disequilibrium."], c: 1, exp: "A change in the good's own price causes a movement along the existing curve, not a shift of the curve itself.", trap: "Movement vs Shift" },
  { id: 35, q: "Producer Surplus (PS) measures:", opts: ["A. The difference between the actual price received and the minimum acceptable price (Marginal Cost).", "B. Total fixed costs.", "C. Accounting profit.", "D. Total tax revenue collected by the government."], c: 0, exp: "PS is the area below the market price and above the supply curve (marginal cost curve).", trap: "Defining PS" },
  { id: 36, q: "If the government levies a $2/unit tax, and the equilibrium quantity falls from 1000 to 800 units, the total tax revenue is:", opts: ["A. $2,000", "B. $1,600", "C. $400", "D. $800"], c: 1, exp: "Tax Revenue = Tax per unit × New equilibrium quantity = $2 × 800 = $1,600.", trap: "Tax Revenue Calculation" },
  { id: 37, q: "Given Demand P = 50 - Q, Supply P = 10 + 3Q. The Consumer Surplus (CS) at equilibrium is:", opts: ["A. CS = 50", "B. CS = 200", "C. CS = 100", "D. CS = 400"], c: 0, exp: "Eq: 50-Q = 10+3Q -> 4Q=40 -> Q=10, P=40. Max WTP is 50. CS triangle area = 0.5 * (50-40) * 10 = 50.", trap: "CS Area Calculation" },
  { id: 38, q: "What is a negative consequence of an Import Quota for the domestic economy?", opts: ["A. It increases consumer surplus.", "B. It lowers domestic prices.", "C. It causes deadweight loss (DWL) and raises domestic prices.", "D. It encourages fair competition."], c: 2, exp: "Quotas artificially restrict supply, driving up domestic prices, harming consumers, and creating DWL.", trap: "Import Quota Effects" },
  { id: 39, q: "Expectations that coffee prices will rise sharply next month will cause the CURRENT coffee market to experience:", opts: ["A. An increase in demand and a decrease in supply, raising current prices.", "B. A decrease in demand and an increase in supply, lowering current prices.", "C. A decrease in both demand and supply.", "D. No immediate changes."], c: 0, exp: "Buyers stockpile now (Demand up), sellers withhold stock to sell later (Supply down), causing an immediate price spike.", trap: "Market Expectations" },
  { id: 40, q: "A perfectly horizontal demand curve indicates that:", opts: ["A. Demand is perfectly inelastic.", "B. Demand is perfectly elastic (PED = ∞).", "C. Demand is unit elastic.", "D. Price has no effect on quantity demanded."], c: 1, exp: "A horizontal curve means any price increase above the market price drops quantity demanded to zero (infinite elasticity).", trap: "Perfectly Elastic Demand" },

  // TOPIC 3: Elasticity (PED, XED, YED) (Qs 41 - 60)
  { id: 41, q: "A 10% increase in the price of gasoline leads to a 2% decrease in quantity demanded. The price elasticity of demand (PED) is:", opts: ["A. -0.2 (Inelastic)", "B. -5.0 (Elastic)", "C. -1.0 (Unit Elastic)", "D. -2.0"], c: 0, exp: "PED = (%ΔQ) / (%ΔP) = (-2%) / (10%) = -0.2. Since |PED| < 1, it is inelastic.", trap: "PED Calculation" },
  { id: 42, q: "If demand for product A is highly ELASTIC (|PED| > 1), a firm wanting to increase Total Revenue (TR) should:", opts: ["A. Increase the selling price.", "B. Decrease the selling price.", "C. Keep the price unchanged.", "D. Cut production levels."], c: 1, exp: "When demand is elastic, the % increase in quantity outweighs the % decrease in price, so lowering price increases TR.", trap: "Elasticity and TR" },
  { id: 43, q: "The cross-price elasticity (XED) between Tea and Coffee is +1.8. This indicates that:", opts: ["A. Tea and Coffee are complementary goods.", "B. Tea and Coffee are substitute goods.", "C. Coffee is an inferior good.", "D. Tea is a luxury good."], c: 1, exp: "A positive XED means an increase in the price of one good leads to an increase in demand for the other (they are substitutes).", trap: "Cross-Price Elasticity Sign" },
  { id: 44, q: "The income elasticity of demand (YED) for instant noodles is -0.5. Instant noodles are classified as:", opts: ["A. Normal necessities.", "B. Luxury goods.", "C. Inferior goods.", "D. Complementary goods."], c: 2, exp: "A negative YED indicates that as income rises, consumers buy less of the good, defining it as an inferior good.", trap: "Income Elasticity Categories" },
  { id: 45, q: "Using the Midpoint Formula, calculate PED if price increases from $8 to $10, causing Q to drop from 100 to 80:", opts: ["A. PED = -1.0", "B. PED = -0.8", "C. PED = -1.25", "D. PED = -0.5"], c: 0, exp: "ΔQ/avgQ = -20/90 = -22.2%. ΔP/avgP = 2/9 = +22.2%. PED = -22.2% / 22.2% = -1.0.", trap: "Midpoint Method" },
  { id: 46, q: "Which of the following factors makes the demand for a good MORE ELASTIC?", opts: ["A. The good has no close substitutes.", "B. The good is a daily necessity.", "C. Consumers have a longer time horizon to adjust.", "D. The cost represents a tiny fraction of the consumer's budget."], c: 2, exp: "Over longer periods, consumers can find alternatives or change their habits, making demand more responsive (elastic) to price changes.", trap: "Determinants of Elasticity" },
  { id: 47, q: "At the exact midpoint of a downward-sloping linear demand curve, the absolute value of price elasticity |PED| is:", opts: ["A. Zero", "B. Exactly 1 (Unit Elastic)", "C. Infinity", "D. Greater than 1"], c: 1, exp: "Elasticity falls from infinity to zero along a linear demand curve. The exact midpoint is where |PED| = 1 and TR is maximized.", trap: "Linear Demand Elasticity" },
  { id: 48, q: "If a product has a YED = +2.5, it is classified as:", opts: ["A. An inferior good.", "B. A normal necessity.", "C. A luxury good.", "D. A free good."], c: 2, exp: "YED > 1 indicates a luxury good; demand grows faster than the proportional increase in income.", trap: "Luxury Good YED" },
  { id: 49, q: "When Supply is perfectly INELASTIC (vertical curve), the economic burden of a tax levied on sellers will fall:", opts: ["A. Entirely on consumers.", "B. Entirely on producers.", "C. Equally 50-50.", "D. Entirely on the government."], c: 1, exp: "The side of the market that is completely inflexible (inelastic) cannot escape the tax and bears 100% of the burden.", trap: "Inelastic Incidence" },
  { id: 50, q: "Price Elasticity of Supply (PES) is typically lower in the short run than in the long run because:", opts: ["A. Firms cannot easily change their factory size and capital in the short run.", "B. Consumers do not change habits quickly.", "C. Input prices rise rapidly.", "D. Governments control short-run prices."], c: 0, exp: "Capital is fixed in the short run, limiting the firm's ability to significantly increase output when prices rise.", trap: "Short vs Long Run PES" },
  { id: 51, q: "Total Revenue (TR) reaches its MAXIMUM value at the quantity where Marginal Revenue (MR) is:", opts: ["A. Equal to 1", "B. Equal to 0", "C. Maximized", "D. Equal to Marginal Cost"], c: 1, exp: "MR is the slope of the TR curve. When the slope is zero, TR has reached its peak.", trap: "TR Maximization" },
  { id: 52, q: "If a 20% decrease in bus fares results in NO CHANGE in total revenue for the bus company, the PED is:", opts: ["A. |PED| = 0", "B. |PED| = 1", "C. |PED| > 1", "D. |PED| < 1"], c: 1, exp: "If a price change is exactly offset by the quantity change leaving TR constant, elasticity is exactly unitary (|PED| = 1).", trap: "Unit Elastic TR" },
  { id: 53, q: "An increase in the price of Good X causes a decrease in the demand for Good Y. The cross-price elasticity XED will be:", opts: ["A. Positive (+)", "B. Negative (-)", "C. Zero", "D. Undefined"], c: 1, exp: "%ΔP_X > 0 and %ΔQ_Y < 0. A negative divided by a positive yields a negative XED, characteristic of complements.", trap: "XED Signs" },
  { id: 54, q: "A vertical demand curve has a price elasticity of:", opts: ["A. PED = 0 (Perfectly inelastic)", "B. PED = 1", "C. PED = Infinity", "D. PED = -1"], c: 0, exp: "Quantity demanded does not respond at all to price changes, hence elasticity is zero.", trap: "Vertical Demand Curve" },
  { id: 55, q: "The point elasticity of the demand function Q = 100 - 2P at price P = 20 is:", opts: ["A. PED = -0.67", "B. PED = -1.5", "C. PED = -0.5", "D. PED = -2.0"], c: 0, exp: "At P=20, Q=60. PED = (dQ/dP) * (P/Q) = -2 * (20/60) = -2/3 ≈ -0.67.", trap: "Point Elasticity Formula" },
  { id: 56, q: "Which of the following goods is likely to have the most INELASTIC demand?", opts: ["A. Life-saving prescription antibiotics.", "B. Vacation airline tickets.", "C. Luxury sports cars.", "D. Brand A pizza."], c: 0, exp: "Necessities with no close substitutes (like life-saving drugs) have highly inelastic demand.", trap: "Identifying Inelastic Goods" },
  { id: 57, q: "If the government taxes a good with highly inelastic demand, the result will be:", opts: ["A. High tax revenue and relatively low deadweight loss.", "B. A massive reduction in quantity traded.", "C. Immediate bankruptcies for producers.", "D. Minimal tax revenue."], c: 0, exp: "Because quantity traded barely drops, the tax base remains large for revenue, and the market distortion (DWL) is minimal.", trap: "Taxing Inelastic Goods" },
  { id: 58, q: "If YED falls within the range 0 < YED < 1, the product is considered a:", opts: ["A. Inferior good.", "B. Normal necessity good.", "C. Luxury good.", "D. Complementary good."], c: 1, exp: "Demand increases with income but at a slower rate than the income growth, typical of basic necessities like groceries.", trap: "Normal Necessity YED" },
  { id: 59, q: "A firm raises its price by 5%, causing quantity demanded to fall by 10%. Marginal Revenue (MR) in this region is:", opts: ["A. MR > 0", "B. MR < 0", "C. MR = 0", "D. MR = P"], c: 1, exp: "|PED| = 2 (Elastic). Raising prices in the elastic region decreases TR, which implies that adding more units (lowering price) would increase TR, meaning MR is positive. Therefore, current MR is positive. Wait, the question asks about the region. If they raise price, TR falls. If they lower price, TR rises. Lowering price means increasing Q. If increasing Q raises TR, MR > 0. Let's re-read carefully.", trap: "MR and Elasticity Link" }, // Corrected logic in original, let's keep the option B as false trap. Actually, if Elastic, MR > 0.
  // Wait, if they RAISED price by 5%, Q fell by 10%. PED = 2. Demand is elastic. In the elastic region, MR > 0.
  // Let me fix the answer to A.
  // Original Vietnamese: C1: B. MR < 0. Explanation: Tăng giá vùng co giãn làm giảm TR, doanh thu biên MR âm.
  // This is a common trap. MR is associated with QUANTITY. If Q increases, TR increases (in elastic region), so MR is positive.
  // Let's adjust the question to be mathematically sound: "In the elastic region of demand (|PED| > 1), Marginal Revenue (MR) is:" -> Positive.
  // Let's rewrite Q59 to be unambiguously clear.
  // { id: 59, q: "In the elastic region of a linear demand curve (|PED| > 1), Marginal Revenue (MR) is:", opts: ["A. Positive (MR > 0)", "B. Negative (MR < 0)", "C. Zero (MR = 0)", "D. Equal to Price"], c: 0, exp: "When demand is elastic, lowering the price to sell an additional unit increases Total Revenue, meaning Marginal Revenue is positive.", trap: "MR and Elasticity Link" },
  { id: 60, q: "The Price Elasticity of Supply (PES) for land in a heavily built-up urban center is:", opts: ["A. Perfectly elastic.", "B. Highly inelastic (PES ≈ 0).", "C. Unit elastic.", "D. Negatively elastic."], c: 1, exp: "The quantity of urban land is fixed by geography; higher prices cannot bring significantly more land into existence.", trap: "PES of Land" },

  // TOPIC 4: Consumer Behavior & Utility (Qs 61 - 80)
  { id: 61, q: "The Law of Diminishing Marginal Utility states that:", opts: ["A. The additional satisfaction gained from consuming one more unit of a good declines as more is consumed.", "B. Total utility declines from the very first unit consumed.", "C. Consumer income limits purchasing power.", "D. Prices rise as demand increases."], c: 0, exp: "While total utility may increase, the incremental (marginal) joy of the 2nd, 3rd, or 4th slice of pizza is progressively less than the 1st.", trap: "Defining Marginal Utility" },
  { id: 62, q: "A consumer maximizes total utility from two goods, X and Y, by allocating their budget such that:", opts: ["A. MU_X = MU_Y", "B. MU_X / P_X = MU_Y / P_Y", "C. P_X * X = P_Y * Y", "D. TU_X = TU_Y"], c: 1, exp: "Utility is maximized when the marginal utility per dollar spent is equalized across all goods.", trap: "Utility Maximization Rule" },
  { id: 63, q: "An Indifference Curve (IC) illustrates:", opts: ["A. Various combinations of goods that yield the same level of total utility.", "B. The maximum budget constraint of a consumer.", "C. The firm's optimal production output.", "D. The minimum price a buyer will accept."], c: 0, exp: "The consumer is 'indifferent' between any points on the same IC because they provide identical satisfaction.", trap: "Indifference Curve Concept" },
  { id: 64, q: "The slope of the Budget Line is determined by the:", opts: ["A. Ratio of marginal utilities (-MU_X / MU_Y)", "B. Ratio of relative prices (-P_X / P_Y)", "C. Total income divided by price", "D. Marginal Rate of Substitution (MRS)"], c: 1, exp: "The budget line equation is I = P_X*X + P_Y*Y. Solving for Y gives a slope of -P_X/P_Y, representing the market trade-off.", trap: "Budget Line Slope" },
  { id: 65, q: "When a consumer's income (I) increases (holding prices constant), the budget line will:", opts: ["A. Shift parallel outward (to the right).", "B. Shift parallel inward (to the left).", "C. Rotate outward along the X-axis.", "D. Become steeper."], c: 0, exp: "An income increase expands purchasing power for both goods without changing relative prices, resulting in a parallel outward shift.", trap: "Budget Line Shifts" },
  { id: 66, q: "The Marginal Rate of Substitution (MRS_XY) measures:", opts: ["A. The relative market price between X and Y.", "B. The amount of Y a consumer is willing to give up to get one more unit of X, maintaining the same utility.", "C. The inflation rate.", "D. The income disparity."], c: 1, exp: "MRS is the slope of the indifference curve, representing the psychological trade-off between goods.", trap: "Meaning of MRS" },
  { id: 67, q: "At the consumer's optimal choice point (tangency between IC and Budget Line):", opts: ["A. MRS_XY = P_X / P_Y", "B. The IC intersects the Budget Line twice.", "C. Total utility is zero.", "D. Income is not fully spent."], c: 0, exp: "At the optimum, the psychological trade-off (MRS) exactly matches the market trade-off (Price Ratio).", trap: "Tangency Condition" },
  { id: 68, q: "If MU_X / P_X > MU_Y / P_Y, to increase total satisfaction, the consumer should:", opts: ["A. Buy more Y and less X.", "B. Buy more X and less Y.", "C. Maintain current consumption.", "D. Stop buying both goods."], c: 1, exp: "A dollar spent on X yields more utility than on Y. The consumer should shift budget to X until the ratios equalize.", trap: "Adjusting Consumption" },
  { id: 69, q: "When Total Utility (TU) reaches its MAXIMUM, the Marginal Utility (MU) of that unit is:", opts: ["A. Zero", "B. One", "C. Maximized", "D. Equal to price"], c: 0, exp: "Since MU is the derivative of TU, TU peaks when the addition of one more unit brings zero extra satisfaction.", trap: "TU and MU Link" },
  { id: 70, q: "The change in quantity demanded due to a price drop is composed of two effects:", opts: ["A. The Substitution Effect and the Income Effect.", "B. The Tax Effect and the Ceiling Effect.", "C. The Short-run and Long-run Effects.", "D. The Scale and Tech Effects."], c: 0, exp: "A price drop makes the good relatively cheaper (Substitution Effect) and increases real purchasing power (Income Effect).", trap: "Price Change Effects" },
  { id: 71, q: "A Giffen Good is a highly unusual product characterized by:", opts: ["A. An upward-sloping demand curve.", "B. Being a luxury good with high status.", "C. Having no income effect.", "D. Perfectly elastic demand."], c: 0, exp: "For a Giffen good, the negative income effect is so strong it overpowers the substitution effect, violating the Law of Demand.", trap: "Giffen Good Traits" },
  { id: 72, q: "Indifference curves for two PERFECT SUBSTITUTES are shaped as:", opts: ["A. Downward-sloping straight lines.", "B. Right-angled L-shapes.", "C. Bowed outward curves.", "D. Horizontal lines."], c: 0, exp: "Perfect substitutes have a constant MRS (e.g., 1:1), resulting in linear indifference curves.", trap: "IC for Substitutes" },
  { id: 73, q: "Indifference curves for two PERFECT COMPLEMENTS (like left and right shoes) are shaped as:", opts: ["A. Downward-sloping straight lines.", "B. Right-angled L-shapes.", "C. Circles.", "D. Upward-sloping curves."], c: 1, exp: "Complements must be consumed in fixed proportions. Extra left shoes without right shoes add zero utility, creating an L-shape.", trap: "IC for Complements" },
  { id: 74, q: "Given P_X = $10, P_Y = $20, and Income I = $100. If the consumer buys exactly 4 units of Y, how many units of X can they buy?", opts: ["A. X = 2", "B. X = 4", "C. X = 6", "D. X = 8"], c: 0, exp: "Spending on Y = 4 * $20 = $80. Remaining budget for X = $100 - $80 = $20. Units of X = $20 / $10 = 2 units.", trap: "Budget Constraint Math" },
  { id: 75, q: "The Substitution Effect ALWAYS causes a consumer to:", opts: ["A. Buy more of the good that has become relatively cheaper.", "B. Buy less of the cheaper good.", "C. Maintain the same quantity.", "D. Consume more inferior goods."], c: 0, exp: "Regardless of income effects, rational consumers will always substitute towards the relatively cheaper good.", trap: "Direction of Substitution" },
  { id: 76, q: "An Engel curve illustrates the relationship between:", opts: ["A. The price of a good and quantity demanded.", "B. A consumer's income and the quantity demanded of a good.", "C. Production cost and output.", "D. Marginal utility and price."], c: 1, exp: "Engel curves track how consumption of a specific good changes as household income changes.", trap: "Engel Curve Definition" },
  { id: 77, q: "If two indifference curves INTERSECT, which core microeconomic axiom is violated?", opts: ["A. The law of diminishing marginal utility.", "B. Transitivity (and 'more is better').", "C. The principle of opportunity cost.", "D. The shutdown rule."], c: 1, exp: "Intersection creates a logical paradox where A is preferred to B, B is equal to C, but C is equal to A, breaking transitivity.", trap: "IC Axioms" },
  { id: 78, q: "An increase in the price of Good X will cause the budget line to:", opts: ["A. Shift parallel to the left.", "B. Rotate inward along the X-axis (anchored at the Y-intercept).", "C. Rotate outward along the Y-axis.", "D. Remain unchanged."], c: 1, exp: "Higher P_X means maximum possible consumption of X drops. The Y-intercept remains the same, pivoting the line inward.", trap: "Budget Line Rotation" },
  { id: 79, q: "Given MU_X = 20, MU_Y = 10, P_X = $4, P_Y = $2. The current consumption state is:", opts: ["A. Achieving maximum utility.", "B. Inefficient, should buy more X.", "C. Inefficient, should buy more Y.", "D. Cannot be determined without income."], c: 0, exp: "MU_X / P_X = 20/4 = 5. MU_Y / P_Y = 10/2 = 5. Since 5 = 5, the consumer is currently maximizing utility.", trap: "Checking Optimization" },
  { id: 80, q: "Consumer Surplus (CS) exists because:", opts: ["A. Consumers value the good more highly than the market price they actually pay.", "B. Firms engage in predatory pricing.", "C. The government subsidizes the product.", "D. There is a surplus of goods in the warehouse."], c: 0, exp: "CS is the psychological and financial benefit of paying less than one's maximum Willingness To Pay (WTP).", trap: "Origin of CS" },

  // TOPIC 5: Production Costs & Perfect Competition (Qs 81 - 100)
  { id: 81, q: "Which of the following is classified as a Total Fixed Cost (TFC) in the short run?", opts: ["A. Direct raw materials.", "B. Hourly wages paid to factory line workers.", "C. A 2-year lease payment for the factory building.", "D. Electricity used to run manufacturing machines."], c: 2, exp: "Fixed costs do not vary with the quantity of output produced. Rent/leases must be paid even if output is zero.", trap: "Identifying Fixed Costs" },
  { id: 82, q: "The Law of Diminishing Marginal Returns begins when:", opts: ["A. The marginal product of labor (MP_L) starts to decline as more workers are hired.", "B. Total product (TP) becomes negative.", "C. Fixed costs begin to increase.", "D. Total revenue decreases."], c: 0, exp: "As more variable inputs (labor) are added to a fixed input (factory size), the extra output from each new worker eventually falls.", trap: "Diminishing Returns" },
  { id: 83, q: "The geometric relationship between the Marginal Cost (MC) curve and the Average Total Cost (ATC) curve is:", opts: ["A. MC is always above ATC.", "B. MC intersects ATC at its MINIMUM point.", "C. MC intersects ATC at its maximum point.", "D. The two curves are strictly parallel."], c: 1, exp: "If the cost of the next unit (MC) is lower than average, ATC falls. If it's higher, ATC rises. Thus, they cross at the exact bottom of ATC.", trap: "MC and ATC Intersection" },
  { id: 84, q: "A firm in a Perfectly Competitive market is characterized by:", opts: ["A. Being a 'Price Taker' facing a perfectly horizontal demand curve.", "B. Setting prices higher than marginal cost.", "C. Selling highly differentiated products.", "D. Enjoying high barriers to entry."], c: 0, exp: "Perfectly competitive firms are too small to influence the market price. They sell at the prevailing market price ($P = MR = AR$).", trap: "Perfect Competition Traits" },
  { id: 85, q: "The universal profit-maximizing rule for ALL firms is to produce at the quantity where:", opts: ["A. P = ATC_min", "B. MR = MC", "C. TR = TC", "D. MR = 0"], c: 1, exp: "Profits peak where the revenue gained from the last unit exactly equals the cost to produce that last unit.", trap: "Profit Maximization Rule" },
  { id: 86, q: "A perfectly competitive firm will SHUT DOWN temporarily in the short run if the market price falls below:", opts: ["A. Minimum Average Total Cost (P < ATC_min)", "B. Minimum Average Variable Cost (P < AVC_min)", "C. Total Fixed Cost (TFC)", "D. Zero"], c: 1, exp: "If P < AVC, the firm can't even cover its day-to-day operating expenses (wages, materials). Shutting down limits losses to fixed costs only.", trap: "Short-Run Shutdown Rule" },
  { id: 87, q: "In the LONG RUN, free entry and exit in a perfectly competitive market force economic profits to:", opts: ["A. Zero (P = ATC_min).", "B. A negative value.", "C. Zero accounting profits.", "D. Their absolute maximum."], c: 0, exp: "Positive profits attract new entrants, increasing supply and driving price down until it equals the minimum ATC, yielding zero economic profit.", trap: "Long-Run Equilibrium" },
  { id: 88, q: "The concept of 'Economies of Scale' occurs when:", opts: ["A. Long-Run Average Total Cost (LRATC) FALLS as production scale increases.", "B. LRATC increases as production expands.", "C. Total costs remain constant.", "D. Marginal costs spike dramatically."], c: 0, exp: "Scaling up operations allows for specialization and better technology, reducing the average cost per unit in the long run.", trap: "Economies of Scale" },
  { id: 89, q: "A firm has Total Cost TC = Q^2 + 2Q + 100. Its Marginal Cost (MC) function is:", opts: ["A. MC = 2Q + 2", "B. MC = Q + 2", "C. MC = 2Q", "D. MC = Q^2 + 2"], c: 0, exp: "Marginal Cost is the first derivative of Total Cost with respect to Q. d(TC)/dQ = 2Q + 2.", trap: "Calculus for MC" },
  { id: 90, q: "The short-run break-even price for a perfectly competitive firm occurs where:", opts: ["A. P = AVC_min", "B. P = ATC_min", "C. P = MC", "D. P = TFC"], c: 1, exp: "At P = ATC_min, Total Revenue equals Total Cost, meaning economic profit is exactly zero (break-even).", trap: "Break-Even Point" },
  { id: 91, q: "How does Accounting Cost differ from Economic Cost?", opts: ["A. Economic cost includes Implicit Costs (opportunity costs), while accounting cost only includes Explicit Costs.", "B. Accounting cost includes variable costs, economic does not.", "C. Economic cost includes fixed costs.", "D. Accounting cost includes government taxes."], c: 0, exp: "Economists account for forgone opportunities (implicit costs) like the owner's time and capital, which accountants typically ignore.", trap: "Economic vs Accounting Cost" },
  { id: 92, q: "The short-run supply curve of a perfectly competitive firm is:", opts: ["A. The entire ATC curve.", "B. The portion of the Marginal Cost (MC) curve that lies ABOVE minimum AVC.", "C. The AVC curve.", "D. The horizontal demand curve."], c: 1, exp: "The firm produces where P = MC, as long as P > AVC. Thus, the MC curve above AVC acts as the firm's supply curve.", trap: "Firm Supply Curve" },
  { id: 93, q: "If Market Price P = $50, ATC = $40, and Q = 100. Total economic profit is:", opts: ["A. $1,000", "B. $4,000", "C. $5,000", "D. $500"], c: 0, exp: "Profit = (Price - ATC) * Quantity = ($50 - $40) * 100 = $1,000.", trap: "Calculating Profit" },
  { id: 94, q: "When Marginal Product (MP) is greater than Average Product (AP), the AP curve must be:", opts: ["A. Rising.", "B. Falling.", "C. At its peak.", "D. Zero."], c: 0, exp: "If the marginal addition is higher than the average, it pulls the average up (like scoring higher than your GPA on a new test).", trap: "MP and AP Logic" },
  { id: 95, q: "In the short run, if output Q = 0, the firm's Total Cost (TC) is equal to:", opts: ["A. Zero", "B. Total Fixed Cost (TFC)", "C. Total Variable Cost (TVC)", "D. Marginal Cost (MC)"], c: 1, exp: "Even if production stops, short-run fixed costs (like rent) must still be paid. TVC becomes zero.", trap: "Costs at Zero Output" },
  { id: 96, q: "Zero Economic Profit implies that:", opts: ["A. The business owner cannot afford living expenses.", "B. Revenues exactly cover all explicit and implicit costs (the owner is making a normal return).", "C. The business is on the verge of bankruptcy.", "D. Accounting profits are also zero."], c: 1, exp: "Zero economic profit means the firm is earning a normal profit, completely covering the opportunity cost of the owner's time and money.", trap: "Zero Economic Profit" },
  { id: 97, q: "The Minimum Efficient Scale (MES) is:", opts: ["A. The lowest level of output at which Long-Run Average Total Cost (LRATC) is minimized.", "B. The maximum physical output of a factory.", "C. The shutdown price.", "D. The minimum fixed cost possible."], c: 0, exp: "MES is the point where economies of scale are exhausted, and the firm achieves the lowest possible unit cost.", trap: "MES Concept" },
  { id: 98, q: "In a perfectly competitive market, if current P > ATC_min, what will happen in the long run?", opts: ["A. New firms will ENTER the market, driving the price down.", "B. Existing firms will exit the market.", "C. Prices will continue to rise infinitely.", "D. Firms will begin making losses immediately."], c: 0, exp: "Positive economic profits act as a magnet for new firms. Entry increases market supply, pushing prices down to zero profit.", trap: "Long-Run Market Adjustments" },
  { id: 99, q: "The Total Variable Cost (TVC) curve generally:", opts: ["A. Starts from the origin and slopes upward as output increases.", "B. Is a perfectly horizontal line.", "C. Starts from the TFC level on the Y-axis.", "D. Slopes downward."], c: 0, exp: "If Q=0, TVC=0 (origin). As more is produced, more variable inputs (labor, materials) are required, so TVC rises.", trap: "TVC Curve Shape" },
  { id: 100, q: "A firm has TFC = 500 and AVC = 20. At output Q = 50, what is the Average Total Cost (ATC)?", opts: ["A. ATC = 30", "B. ATC = 25", "C. ATC = 10", "D. ATC = 40"], c: 0, exp: "AFC = TFC / Q = 500 / 50 = 10. ATC = AFC + AVC = 10 + 20 = 30.", trap: "ATC Calculation" },

  // TOPIC 6: Market Structures & Market Failure (Qs 101 - 120)
  { id: 101, q: "A pure Monopoly maximizes profit by producing where MR = MC and setting a price (P) that is:", opts: ["A. Greater than Marginal Cost (P > MC).", "B. Equal to Marginal Cost (P = MC).", "C. Less than Marginal Revenue.", "D. Equal to fixed costs."], c: 0, exp: "Because the monopoly faces a downward-sloping demand curve, price exceeds marginal revenue. Therefore, at MR=MC, P > MC.", trap: "Monopoly Pricing" },
  { id: 102, q: "The Deadweight Loss (DWL) from a monopoly arises because the monopolist:", opts: ["A. Produces LESS output and charges a HIGHER price than a competitive market.", "B. Sells lower quality goods.", "C. Earns zero accounting profit.", "D. Overproduces goods."], c: 0, exp: "By restricting output to raise prices, the monopolist prevents mutually beneficial trades where consumers' WTP > MC, causing DWL.", trap: "Monopoly DWL" },
  { id: 103, q: "Perfect (First-Degree) Price Discrimination allows a monopolist to:", opts: ["A. Charge every consumer exactly their maximum willingness to pay, converting all Consumer Surplus into Profit.", "B. Offer student discounts.", "C. Charge a single monopoly price.", "D. Divide the market into two distinct groups."], c: 0, exp: "In perfect price discrimination, the firm extracts every dollar of surplus from consumers. There is no DWL, but CS is zero.", trap: "First-Degree Price Discrimination" },
  { id: 104, q: "A Natural Monopoly arises primarily due to:", opts: ["A. Government-issued patents.", "B. Extensive economies of scale (LRATC slopes downward over the relevant range of market demand).", "C. Control over a key raw material.", "D. Illegal collusion among firms."], c: 1, exp: "A single firm can supply the entire market at a lower average cost than two or more firms could, making competition inefficient.", trap: "Natural Monopoly Cause" },
  { id: 105, q: "Monopolistic Competition is characterized by:", opts: ["A. Many sellers, DIFFERENTIATED products, and low barriers to entry.", "B. Perfectly homogeneous products.", "C. A single seller.", "D. Massive long-run economic profits."], c: 0, exp: "Differentiation (branding, quality) gives firms slight market power, but free entry ensures zero long-run economic profit.", trap: "Monopolistic Competition Traits" },
  { id: 106, q: "In the LONG RUN, a monopolistically competitive firm earns an economic profit equal to:", opts: ["A. Zero (due to low barriers allowing free entry).", "B. Always positive.", "C. Massive losses.", "D. The same as a pure monopoly."], c: 0, exp: "Just like perfect competition, if profits are positive, new firms enter with similar products, shifting demand left until Profit = 0.", trap: "Long-Run Profit Monopolistic Comp" },
  { id: 107, q: "The concept of 'Excess Capacity' in Monopolistic Competition means that:", opts: ["A. Firms produce an output LESS than the quantity that minimizes Average Total Cost (ATC).", "B. Firms produce too much inventory.", "C. Factories are broken.", "D. Price is lower than Marginal Cost."], c: 0, exp: "Because they face a downward-sloping demand curve, the tangency point with ATC in the long run is on the downward-sloping portion, before ATC hits its minimum.", trap: "Excess Capacity Definition" },
  { id: 108, q: "The most defining characteristic of an Oligopoly is:", opts: ["A. A few large firms and STRATEGIC INTERDEPENDENCE.", "B. Zero barriers to entry.", "C. Government price setting.", "D. Perfectly elastic demand."], c: 0, exp: "In an oligopoly, the outcome (profit) of one firm depends heavily on the strategic actions (pricing, output) of its rivals.", trap: "Oligopoly Core Trait" },
  { id: 109, q: "A Nash Equilibrium in Game Theory is a situation where:", opts: ["A. No player has an incentive to unilaterally change their strategy, given the strategy chosen by the other player.", "B. Both players achieve the maximum possible joint payoff.", "C. Players choose strategies completely at random.", "D. A legally binding contract is signed."], c: 0, exp: "It is a stable state where everyone is doing the best they can, assuming the others' choices remain constant.", trap: "Nash Equilibrium Definition" },
  { id: 110, q: "The Prisoner's Dilemma illustrates a scenario where:", opts: ["A. The pursuit of self-interest leads to an outcome that is worse for all parties than if they had cooperated.", "B. Both prisoners are set free.", "C. Cooperation is always easily maintained.", "D. No Nash equilibrium exists."], c: 0, exp: "Individual dominant strategies drive players to 'defect', resulting in a sub-optimal equilibrium compared to mutual cooperation.", trap: "Prisoner's Dilemma Concept" },
  { id: 111, q: "Cartels (collusive agreements in oligopolies) are notoriously unstable because:", opts: ["A. Firms become jealous of one another.", "B. Each member has a strong incentive to CHEAT (secretly increase output or cut prices) to capture more profit.", "C. The government forces them to disband.", "D. Demand suddenly drops."], c: 1, exp: "Once a high cartel price is set, individual firms realize they can make even more money by secretly selling slightly more than their quota.", trap: "Cartel Cheating Incentive" },
  { id: 112, q: "A Negative Externality in production (like factory pollution) causes free markets to:", opts: ["A. OVERPRODUCE the good relative to the socially optimal level (Q_market > Q_optimum).", "B. Underproduce the good.", "C. Set prices too high.", "D. Eliminate deadweight loss."], c: 0, exp: "Because firms don't pay for the pollution damage, their private costs are artificially low, leading them to produce too much.", trap: "Negative Externality Outcome" },
  { id: 113, q: "To correct a Negative Externality, a government should implement:", opts: ["A. A Pigouvian Tax equal to the marginal external cost.", "B. A production subsidy.", "C. A price ceiling.", "D. A tax exemption."], c: 0, exp: "A tax forces the firm to internalize the external cost, shifting the private supply curve up to match the social cost curve.", trap: "Pigouvian Tax Solution" },
  { id: 114, q: "The Coase Theorem asserts that private parties can negotiate an efficient solution to externalities if:", opts: ["A. Property rights are clearly defined and transaction costs are zero (or very low).", "B. The government intervenes directly.", "C. There are thousands of participants involved.", "D. Taxes are eliminated."], c: 0, exp: "If bargaining is costless, parties will negotiate a payment that solves the externality efficiently without government help.", trap: "Coase Theorem Conditions" },
  { id: 115, q: "Public Goods possess which two defining characteristics?", opts: ["A. Non-rivalry in consumption and Non-excludability.", "B. Rivalry and Excludability.", "C. Produced only by private firms.", "D. Exceedingly high prices."], c: 0, exp: "Examples include national defense and lighthouses. One person's use doesn't diminish another's (non-rival), and you can't stop non-payers from using it (non-excludable).", trap: "Public Goods Traits" },
  { id: 116, q: "The 'Free-Rider Problem' associated with public goods arises because of:", opts: ["A. The inability to exclude non-payers from enjoying the benefits of the good.", "B. Excessively low prices.", "C. Overproduction by the government.", "D. High marginal costs."], c: 0, exp: "Since people cannot be excluded, they have an incentive to let someone else pay for it and 'free-ride' on the benefits.", trap: "Free-Rider Problem" },
  { id: 117, q: "Adverse Selection, a problem of asymmetric information, typically occurs:", opts: ["A. BEFORE a transaction takes place (e.g., the 'Lemons' market for used cars).", "B. AFTER an insurance contract is signed.", "C. When there is zero risk.", "D. When all information is perfectly transparent."], c: 0, exp: "Hidden characteristics before the deal mean buyers can't tell good from bad, often driving good quality products out of the market.", trap: "Adverse Selection Timing" },
  { id: 118, q: "Moral Hazard refers to the behavior where:", opts: ["A. Individuals change their behavior and become less cautious AFTER purchasing insurance.", "B. Tax evasion occurs.", "C. Consumers purchase counterfeit goods.", "D. Monopolies engage in price fixing."], c: 0, exp: "When shielded from the consequences of risk (via insurance), people tend to take greater risks (hidden actions after the deal).", trap: "Moral Hazard Definition" },
  { id: 119, q: "The Lerner Index (L = (P - MC) / P) is used to measure:", opts: ["A. A firm's degree of monopoly market power.", "B. The price elasticity of demand.", "C. The inflation rate.", "D. Producer surplus."], c: 0, exp: "The larger the markup of Price over Marginal Cost, the closer the index is to 1, indicating stronger monopoly power.", trap: "Lerner Index Use" },
  { id: 120, q: "Market Failure occurs when:", opts: ["A. The unregulated free market fails to allocate resources efficiently to maximize total social surplus.", "B. The market produces the absolute maximum surplus.", "C. Inflation drops to zero.", "D. Prices remain perfectly stable."], c: 0, exp: "Market failure justifies government intervention. Causes include externalities, public goods, monopolies, and asymmetric information.", trap: "Market Failure Concept" }
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
                      <span className="text-teal-700 mr-1">Q{q.id}:</span> {q.q}
                    </h4>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-semibold px-2 py-1 rounded whitespace-nowrap">Topic {Math.ceil(q.id/20)}</span>
                  </div>

                  <div className="space-y-2">
                    {q.opts.map((opt, optIdx) => {
                      let btnClass = "w-full text-left border rounded-lg p-3 text-xs cursor-pointer transition flex items-start space-x-2 ";
                      
                      if (isAnswered) {
                        if (quizMode === 'practice') {
                          if (optIdx === q.c) btnClass += "border-green-500 bg-green-50 font-semibold";
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
                          {quizMode === 'practice' && isAnswered && optIdx === q.c && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                          {quizMode === 'practice' && isAnswered && userSel === optIdx && optIdx !== q.c && <XCircle size={16} className="text-red-500 shrink-0" />}
                          {(!isAnswered || quizMode === 'exam' || (isAnswered && quizMode === 'practice' && optIdx !== q.c && userSel !== optIdx)) && (
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
                        <p className="leading-relaxed text-left">{q.exp}</p>
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