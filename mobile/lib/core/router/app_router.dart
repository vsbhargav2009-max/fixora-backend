import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/projects/presentation/client_projects_screen.dart';
import '../../features/projects/presentation/freelancer_projects_screen.dart';
import '../../features/payments/presentation/payment_breakdown_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    routes: [
      GoRoute(path: '/', builder: (context, state) => const LoginScreen()),
      GoRoute(path: '/client/projects', builder: (context, state) => const ClientProjectsScreen()),
      GoRoute(path: '/freelancer/projects', builder: (context, state) => const FreelancerProjectsScreen()),
      GoRoute(path: '/payments/breakdown', builder: (context, state) => const PaymentBreakdownScreen()),
    ],
  );
});
