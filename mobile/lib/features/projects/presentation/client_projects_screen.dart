import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ClientProjectsScreen extends StatelessWidget {
  const ClientProjectsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Client Projects')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go('/payments/breakdown'),
        child: const Icon(Icons.add),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          ListTile(title: Text('Need Flutter Developer'), subtitle: Text('Budget ₹50,000 · Deadline 20 days')),
          ListTile(title: Text('UI/UX polish for e-commerce app'), subtitle: Text('Budget ₹25,000 · Deadline 10 days')),
        ],
      ),
    );
  }
}
