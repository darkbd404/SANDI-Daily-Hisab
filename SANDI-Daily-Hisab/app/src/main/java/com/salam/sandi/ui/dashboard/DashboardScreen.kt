package com.salam.sandi.ui.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*

@Composable
fun DashboardScreen(repository: SandiRepository) {
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val totalIncome = incomes.sumOf { it.amountPoisha }
    val totalExpense = expenses.sumOf { it.amountPoisha }
    val netProfit = totalIncome - totalExpense

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "SANDI DAILY HISAB",
                style = MaterialTheme.typography.titleLarge,
                color = GoldAccent
            )
            Text(
                text = "মালিক: আব্দুছ ছালাম · Sandi Company",
                style = MaterialTheme.typography.bodyMedium,
                color = MutedSlate
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট আয়", color = MutedSlate)
                    Text(
                        text = "৳ " + (totalIncome / 100.0).toString(),
                        style = MaterialTheme.typography.headlineMedium,
                        color = IncomeGreen
                    )
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট ব্যয়", color = MutedSlate)
                    Text(
                        text = "৳ " + (totalExpense / 100.0).toString(),
                        style = MaterialTheme.typography.headlineMedium,
                        color = ExpenseRed
                    )
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট নিট লাভ", color = MutedSlate)
                    Text(
                        text = "৳ " + (netProfit / 100.0).toString(),
                        style = MaterialTheme.typography.headlineLarge,
                        color = ProfitSky
                    )
                }
            }
        }
    }
}
