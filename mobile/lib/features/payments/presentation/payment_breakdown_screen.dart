import 'package:flutter/material.dart';

class PaymentBreakdownScreen extends StatelessWidget {
  const PaymentBreakdownScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('See Payment Breakdown')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ExpansionTile(
            title: const Text('Client View'),
            children: const [
              ListTile(title: Text('Project Value'), trailing: Text('₹2000')),
              ListTile(title: Text('Gateway Fee (client side)'), trailing: Text('₹40')),
              ListTile(title: Text('Client Total'), trailing: Text('₹2040')),
            ],
          ),
          ExpansionTile(
            title: const Text('Freelancer View'),
            children: const [
              ListTile(title: Text('Project Value'), trailing: Text('₹2000')),
              ListTile(title: Text('Platform Service Fee (15%)'), trailing: Text('₹300')),
              ListTile(title: Text('GST on Commission (18%)'), trailing: Text('₹54')),
              ListTile(title: Text('Final Payout'), trailing: Text('₹1646')),
            ],
          ),
          const SizedBox(height: 20),
          ElevatedButton(onPressed: () {}, child: const Text('Pay & Hold in Escrow')),
        ],
      ),
    );
  }
}
