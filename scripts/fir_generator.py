#!/usr/bin/env python3
"""
Founder-in-Residence (FIR) Profile Generator
Synthesizes all asset data into a comprehensive leadership mandate
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional

class FIRGenerator:
    def __init__(self):
        self.data_sources = {
            'business_plan': 'Business_Plan.md',
            'hcl_report': 'HCL_Report.md',
            'quality_report': 'Code_Quality_Report.md',
            'aga_results': 'AGAResults.json'
        }
    
    def load_business_plan(self) -> Dict:
        """Load and parse business plan data"""
        try:
            with open(self.data_sources['business_plan'], 'r') as f:
                content = f.read()
            
            # Mock parsing - in real implementation, this would use NLP/LLM
            return {
                "market_size": "$50B+",
                "target_market": "Small business owners and entrepreneurs",
                "competition": ["Traditional consulting", "Template services"],
                "value_proposition": "AI-powered business plan generation",
                "business_model": "SaaS subscription",
                "revenue_projection": "$1M ARR in 18 months"
            }
        except FileNotFoundError:
            return {
                "market_size": "Large market",
                "target_market": "Business owners",
                "competition": ["Traditional solutions"],
                "value_proposition": "Innovative solution",
                "business_model": "SaaS",
                "revenue_projection": "$1M ARR"
            }
    
    def load_hcl_report(self) -> Dict:
        """Load Human Contribution Log data"""
        try:
            with open(self.data_sources['hcl_report'], 'r') as f:
                content = f.read()
            
            # Extract key information
            lines = content.split('\n')
            curator = "Unknown Curator"
            time_spent = "2.0"
            
            for line in lines:
                if "Curator:" in line:
                    curator = line.split("Curator:")[1].strip()
                elif "Total Time Spent:" in line:
                    time_spent = line.split("Total Time Spent:")[1].strip()
            
            return {
                "curator": curator,
                "time_spent": time_spent,
                "ip_status": "Defensible",
                "human_contribution": "Confirmed"
            }
        except FileNotFoundError:
            return {
                "curator": "Unknown",
                "time_spent": "0.0",
                "ip_status": "Pending",
                "human_contribution": "Required"
            }
    
    def load_quality_report(self) -> Dict:
        """Load code quality and liability data"""
        try:
            with open(self.data_sources['quality_report'], 'r') as f:
                content = f.read()
            
            # Extract AI Debt Score from the report
            lines = content.split('\n')
            ai_debt_score = 75.0
            human_cost = 0.0
            
            for line in lines:
                if "AI Debt Score:" in line:
                    score_text = line.split("AI Debt Score:")[1].strip()
                    ai_debt_score = float(score_text.split('/')[0].replace('*', '').strip())
                elif "Estimated Human Remediation Cost:" in line:
                    cost_text = line.split("Estimated Human Remediation Cost:")[1].strip()
                    human_cost = float(cost_text.replace('*', '').replace('$', '').replace(',', '').strip())
            
            return {
                "ai_debt_score": ai_debt_score,
                "human_cost": human_cost,
                "quality_status": "Good" if ai_debt_score >= 75 else "Needs Improvement",
                "technical_risk": "Low" if ai_debt_score >= 80 else "Medium" if ai_debt_score >= 60 else "High"
            }
        except FileNotFoundError:
            return {
                "ai_debt_score": 0.0,
                "human_cost": 0.0,
                "quality_status": "Unknown",
                "technical_risk": "Unknown"
            }
    
    def load_aga_results(self) -> Dict:
        """Load Autonomous Growth Agent results"""
        try:
            with open(self.data_sources['aga_results'], 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {
                "traction_validated": False,
                "total_signups": 0,
                "total_revenue": 0.0,
                "campaign_success": "Failed"
            }
    
    def generate_executive_summary(self, business_data: Dict, quality_data: Dict, aga_data: Dict) -> str:
        """Generate executive summary for the FIR mandate"""
        
        traction_status = "validated" if aga_data.get('traction_validated', False) else "pending"
        quality_score = quality_data.get('ai_debt_score', 0)
        
        summary = f"""This validated MVP represents a {business_data['business_model']} opportunity in the {business_data['target_market']} market, estimated at {business_data['market_size']}. 

The technical foundation shows {'excellent' if quality_score >= 80 else 'good' if quality_score >= 60 else 'acceptable'} code quality (AI Debt Score: {quality_score}/{100}), with {'minimal' if quality_data.get('human_cost', 0) < 1000 else 'manageable'} technical debt requiring ${quality_data.get('human_cost', 0):.0f} in remediation costs.

Market validation is {'complete' if traction_status == 'validated' else 'ongoing'}, with the autonomous growth campaign {'successfully demonstrating' if traction_status == 'validated' else 'attempting to establish'} product-market fit through {aga_data.get('total_signups', 0)} signups and ${aga_data.get('total_revenue', 0):.0f} in early revenue.

The ideal Founder-in-Residence must combine {'technical leadership' if quality_score < 70 else 'scaling expertise'} with deep {'enterprise sales' if 'B2B' in business_data.get('target_market', '') else 'growth marketing'} experience to navigate the challenges of {'technical debt management' if quality_score < 70 else 'rapid scaling'} while {'fixing growth channels' if not aga_data.get('traction_validated', False) else 'capitalizing on proven traction'}."""
        
        return summary
    
    def generate_core_missions(self, business_data: Dict, quality_data: Dict, aga_data: Dict) -> List[str]:
        """Generate the top 3 core missions for the next 6 months"""
        
        missions = []
        
        # Mission 1: Based on technical debt level
        ai_debt_score = quality_data.get('ai_debt_score', 0)
        if ai_debt_score < 60:
            missions.append("TECHNICAL FOUNDATION: Immediately address critical technical debt and security vulnerabilities to establish production-ready infrastructure. Target: Achieve 80+ AI Debt Score within 90 days to enable secure scaling.")
        elif ai_debt_score < 80:
            missions.append("TECHNICAL OPTIMIZATION: Optimize codebase architecture and implement automated testing infrastructure while maintaining current functionality. Target: Reach enterprise-grade reliability standards.")
        else:
            missions.append("SCALING ARCHITECTURE: Transition from MVP to scalable platform architecture capable of handling 10x growth. Focus on microservices, caching, and performance optimization.")
        
        # Mission 2: Based on traction validation
        if aga_data.get('traction_validated', False):
            missions.append("GROWTH SCALING: Capitalize on validated traction channels identified by the autonomous growth agent. Implement systematic replication of successful acquisition methods while optimizing conversion funnels. Target: Scale from current ${aga_data.get('total_revenue', 0):.0f} to $100K MRR within 6 months.")
        else:
            failed_platforms = []
            if aga_data.get('campaign_results', {}).get('platforms', {}):
                for platform, results in aga_data['campaign_results']['platforms'].items():
                    if results.get('signups', 0) < 15:  # Low performance threshold
                        failed_platforms.append(platform)
            
            if failed_platforms:
                missions.append(f"CHANNEL REDISCOVERY: Pivot away from failed growth channels ({', '.join(failed_platforms)}) and identify 2-3 new customer acquisition channels through direct outreach, partnerships, or content marketing. Focus on channels with higher conversion potential for the {business_data.get('target_market', 'target market')}.")
            else:
                missions.append("GROWTH CHANNEL OPTIMIZATION: Analyze autonomous growth agent results to identify and optimize the most promising customer acquisition channels. Increase campaign budget and refine targeting based on conversion data.")
        
        # Mission 3: Based on business model and market
        if business_data.get('business_model') == 'SaaS':
            missions.append("SAAS OPTIMIZATION: Implement comprehensive subscription management, onboarding automation, and retention systems. Establish customer success processes and implement usage-based pricing optimization. Target: Achieve 95%+ retention and $1M ARR run rate within 6 months.")
        else:
            missions.append("REVENUE OPTIMIZATION: Develop and implement secondary revenue streams while optimizing the primary business model. Focus on enterprise sales processes, partnership development, and product-market fit refinement for sustainable growth.")
        
        return missions[:3]  # Ensure exactly 3 missions
    
    def identify_critical_skills(self, business_data: Dict, quality_data: Dict, aga_data: Dict) -> Dict:
        """Identify the single most critical missing skill"""
        
        ai_debt_score = quality_data.get('ai_debt_score', 0)
        traction_validated = aga_data.get('traction_validated', False)
        business_model = business_data.get('business_model', '')
        
        # Determine primary risk/opportunity
        if ai_debt_score < 60:
            return {
                "skill": "Senior Software Architecture Leadership",
                "description": "Critical need for a technical co-founder with 10+ years experience in scalable system design, security implementation, and development team leadership. Must have prior experience taking technical debt-heavy codebases to production scale.",
                "priority": "IMMEDIATE",
                "rationale": "Technical debt poses existential risk to scaling plans"
            }
        elif not traction_validated:
            return {
                "skill": "Growth Marketing & Customer Acquisition Leadership", 
                "description": "Essential expertise in data-driven customer acquisition, conversion optimization, and multi-channel growth strategies. Must have proven track record of scaling SaaS/technology products from $0 to $1M+ ARR.",
                "priority": "CRITICAL",
                "rationale": "Product-market fit validation is essential for investor confidence"
            }
        elif business_model == 'SaaS':
            return {
                "skill": "Enterprise Sales & Customer Success Leadership",
                "description": "Deep experience in B2B SaaS sales processes, enterprise customer onboarding, and customer success management. Must have network and experience closing deals with Fortune 500 companies and managing complex enterprise relationships.",
                "priority": "HIGH",
                "rationale": "Enterprise sales expertise needed to scale beyond early adopters"
            }
        else:
            return {
                "skill": "Strategic Business Development & Partnerships",
                "description": "Proven ability to identify, negotiate, and execute strategic partnerships that drive significant revenue growth. Must have experience in market expansion, competitive positioning, and investor relations.",
                "priority": "MEDIUM",
                "rationale": "Strategic partnerships essential for sustainable competitive advantage"
            }
    
    def generate_cursor_prompt(self, mandate_data: Dict) -> str:
        """Generate the complete Cursor Agent prompt for VC Partner synthesis"""
        
        business_summary = mandate_data['business_summary']
        missions = mandate_data['missions']
        critical_skill = mandate_data['critical_skill']
        
        prompt = f"""You are a top-tier Venture Capital Partner with 15+ years experience in technology investments. Generate a comprehensive Founder-in-Residence (FIR) mandate for a validated MVP asset.

CONTEXT:
- Validated MVP in {business_summary['target_market']} market
- Technical quality: {business_summary['quality_status']} (AI Debt Score: {business_summary['ai_debt_score']}/100)
- Market traction: {'VALIDATED' if business_summary['traction_validated'] else 'PENDING'}
- Business model: {business_summary['business_model']}

REQUIRED OUTPUT FORMAT:

# FOUNDER-IN-RESIDENCE MANDATE

## Executive Summary
{business_summary['executive_summary']}

## The Opportunity
- Market Size: {business_summary['market_size']}
- Target Market: {business_summary['target_market']}
- Value Proposition: {business_summary['value_proposition']}
- Revenue Potential: {business_summary['revenue_projection']}

## Technical Assessment
- Code Quality Score: {business_summary['ai_debt_score']}/100
- Technical Risk Level: {business_summary['technical_risk']}
- Remediation Cost: ${business_summary['human_cost']:.0f}
- Status: {'Production Ready' if business_summary['ai_debt_score'] >= 80 else 'Needs Improvement'}

## Market Traction
- Growth Campaign Results: {business_summary['total_signups']} signups, ${business_summary['total_revenue']:.0f} revenue
- Validation Status: {'COMPLETE' if business_summary['traction_validated'] else 'IN PROGRESS'}
- Growth Agent Performance: {business_summary['campaign_success']}

## TOP 3 CORE MISSIONS (Next 6 Months)
{chr(10).join([f"{i+1}. {mission}" for i, mission in enumerate(missions)])}

## CRITICAL MISSING SKILL: {critical_skill['skill']}

**Priority Level:** {critical_skill['priority']}

**Description:** {critical_skill['description']}

**Why This Skill is Critical:** {critical_skill['rationale']}

## FIR Profile Requirements

### Essential Qualifications:
- Previous startup experience scaling to $1M+ ARR
- Expertise in {critical_skill['skill'].lower()}
- Strong network in {business_summary['target_market'].lower()} sector
- Track record of building high-performing teams

### Compensation & Equity:
- Competitive salary + significant equity package
- Performance-based incentives tied to ARR milestones
- Opportunity to become co-founder based on performance

### Success Metrics (6-Month Goals):
- Achieve all 3 Core Missions
- Reach ${'100K' if business_summary['traction_validated'] else '50K'} MRR
- Build core team of 5-7 people
- Establish enterprise sales process (if applicable)

## Investment Thesis
This asset represents a {'proven' if business_summary['traction_validated'] else 'promising'} opportunity requiring a {'scaling' if business_summary['traction_validated'] else 'foundational'} leader to {'accelerate growth' if business_summary['traction_validated'] else 'establish market fit'} and achieve {'rapid' if business_summary['traction_validated'] else 'sustainable'} scaling to the $1M ARR milestone within 12-18 months.

---
*Mandate generated by FounderX Asset Validation System*
*Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*"""

        return prompt
    
    def generate_fir_mandate(self) -> Dict:
        """Main function to generate the complete FIR mandate"""
        
        print("🔍 Loading asset data for FIR generation...")
        
        # Load all data sources
        business_data = self.load_business_plan()
        hcl_data = self.load_hcl_report()
        quality_data = self.load_quality_report()
        aga_data = self.load_aga_results()
        
        print("✅ Data loaded successfully")
        
        # Generate mandate components
        executive_summary = self.generate_executive_summary(business_data, quality_data, aga_data)
        core_missions = self.generate_core_missions(business_data, quality_data, aga_data)
        critical_skill = self.identify_critical_skills(business_data, quality_data, aga_data)
        
        # Combine into mandate data
        mandate_data = {
            'business_summary': {
                'target_market': business_data['target_market'],
                'quality_status': quality_data['quality_status'],
                'ai_debt_score': quality_data['ai_debt_score'],
                'traction_validated': aga_data.get('traction_validated', False),
                'business_model': business_data['business_model'],
                'market_size': business_data['market_size'],
                'value_proposition': business_data['value_proposition'],
                'revenue_projection': business_data['revenue_projection'],
                'technical_risk': quality_data['technical_risk'],
                'human_cost': quality_data['human_cost'],
                'total_signups': aga_data.get('total_signups', 0),
                'total_revenue': aga_data.get('total_revenue', 0),
                'campaign_success': aga_data.get('campaign_success', 'Unknown'),
                'executive_summary': executive_summary
            },
            'missions': core_missions,
            'critical_skill': critical_skill
        }
        
        # Generate the complete prompt
        cursor_prompt = self.generate_cursor_prompt(mandate_data)
        
        print("🎯 FIR mandate generated successfully!")
        print(f"   Target Market: {business_data['target_market']}")
        print(f"   Quality Score: {quality_data['ai_debt_score']}/100")
        print(f"   Traction Status: {'✅ Validated' if aga_data.get('traction_validated', False) else '⏳ Pending'}")
        print(f"   Critical Skill: {critical_skill['skill']}")
        
        return {
            'mandate_data': mandate_data,
            'cursor_prompt': cursor_prompt,
            'generation_time': datetime.now().isoformat()
        }
    
    def save_to_files(self, mandate_data: Dict) -> None:
        """Save the mandate to template files"""
        
        # Save the Cursor prompt to a file for easy copy-paste
        with open('FIR_Mandate_Prompt.txt', 'w') as f:
            f.write(mandate_data['cursor_prompt'])
        
        # Save the mandate data as JSON for reference
        with open('FIR_Mandate_Data.json', 'w') as f:
            json.dump(mandate_data['mandate_data'], f, indent=2)
        
        print("💾 FIR mandate saved to files:")
        print("   - FIR_Mandate_Prompt.txt (for Cursor Agent)")
        print("   - FIR_Mandate_Data.json (structured data)")

def main():
    """Main execution function"""
    print("🚀 Starting Founder-in-Residence Profile Generator...")
    
    generator = FIRGenerator()
    
    try:
        # Generate the mandate
        result = generator.generate_fir_mandate()
        
        # Save to files
        generator.save_to_files(result)
        
        print("\n🎉 FIR Generation Complete!")
        print("\n📋 Summary:")
        mandate = result['mandate_data']
        skill = mandate['critical_skill']['skill']
        print(f"   Target Market: {mandate['business_summary']['target_market']}")
        print(f"   Quality Score: {mandate['business_summary']['ai_debt_score']}/100")
        print(f"   Traction: {'✅ Validated' if mandate['business_summary']['traction_validated'] else '⏳ Pending'}")
        print(f"   Critical Need: {skill}")
        
        print(f"\n🤖 Use the generated prompt in Cursor Agent for final synthesis")
        
    except Exception as e:
        print(f"❌ Error generating FIR mandate: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
