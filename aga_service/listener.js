/**
 * Autonomous Growth Agent (AGA) Listener Service
 * Receives deployment webhooks and triggers growth campaigns
 */

const express = require('express');
const { launchCampaign } = require('./growth_agent');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        service: 'AGA Listener',
        timestamp: new Date().toISOString()
    });
});

// Main webhook endpoint for deployment completion
app.post('/webhook', async (req, res) => {
    try {
        const { project_id, deployment_url, business_plan_path } = req.body;
        
        console.log(`🚀 Deployment webhook received for project: ${project_id}`);
        console.log(`   URL: ${deployment_url}`);
        console.log(`   Business Plan: ${business_plan_path}`);
        
        // Validate required fields
        if (!project_id) {
            return res.status(400).json({ 
                error: 'project_id is required' 
            });
        }
        
        // Log the webhook event
        console.log(`📊 Starting growth campaign for project ${project_id}...`);
        
        // Trigger the growth campaign
        const campaignResult = await launchCampaign(project_id, {
            deployment_url,
            business_plan_path
        });
        
        // Return immediate response
        res.status(200).json({
            status: 'success',
            message: 'Growth campaign initiated',
            project_id,
            campaign_id: campaignResult.campaign_id,
            estimated_completion: '7 days'
        });
        
        console.log(`✅ Growth campaign initiated for project ${project_id}`);
        console.log(`   Campaign ID: ${campaignResult.campaign_id}`);
        
    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to process webhook',
            error: error.message
        });
    }
});

// Traction webhook endpoint (called by MVP landing pages)
app.post('/traction-webhook', (req, res) => {
    try {
        const { project_id, event_type, user_data } = req.body;
        
        console.log(`📈 Traction event received for project ${project_id}: ${event_type}`);
        
        // Log the traction event
        console.log(`   Event: ${event_type}`);
        console.log(`   User Data:`, user_data);
        
        // Update project status in database
        // This would typically update a database record
        console.log(`   Status updated for project ${project_id}`);
        
        res.status(200).json({
            status: 'success',
            message: 'Traction event recorded'
        });
        
    } catch (error) {
        console.error('❌ Error processing traction webhook:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to process traction event'
        });
    }
});

// Campaign status endpoint
app.get('/campaign/:project_id/status', (req, res) => {
    const { project_id } = req.params;
    
    // Mock campaign status - in real implementation, this would query a database
    const mockStatus = {
        project_id,
        status: 'active',
        days_remaining: 5,
        signups: 23,
        budget_spent: 67.50,
        target_met: false,
        traction_validated: false
    };
    
    res.json(mockStatus);
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AGA Listener Service running on port ${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
    console.log(`   Webhook endpoint: http://localhost:${PORT}/webhook`);
    console.log(`   Traction webhook: http://localhost:${PORT}/traction-webhook`);
});

module.exports = app;
