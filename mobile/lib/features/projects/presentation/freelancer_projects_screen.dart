import 'package:flutter/material.dart';

class FreelancerProjectsScreen extends StatelessWidget {
  const FreelancerProjectsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Browse Projects')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          ListTile(
            title: Text('React Native bug fixes'),
            subtitle: Text('Bid now · set custom amount and message'),
          ),
        ],
      ),
    );
  }
}
