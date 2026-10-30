package com.salam.sandi.ui.voucher

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*

@Composable
fun DailyVoucherScreen(repository: SandiRepository) {
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
                text = "সারাদিনের দৈনিক সম্মিলিত ভাউচার",
                style = MaterialTheme.typography.titleLarge,
                color = GoldAccent
            )
            Text(
                text = "১টি ভাউচারেই সারাদিনের মোট আয় ও ব্যয় হিসাব (৩০ দিনে ৩০টি ভাউচার)",
                style = MaterialTheme.typography.bodySmall,
                color = MutedSlate
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "SANDI AUTO EASY BIKE", color = GoldAccent, style = MaterialTheme.typography.titleMedium)
                    Text(text = "কোম্পানি: Sandi · মালিক: আব্দুছ ছালাম", color = MutedSlate)
                    Divider(modifier = Modifier.padding(vertical = 8.dp), color = MutedSlate.copy(alpha = 0.3f))
                    
                    Text(text = "সারাদিনের মোট আয়: ৳ " + (totalIncome / 100.0), color = IncomeGreen)
                    Text(text = "সারাদিনের মোট ব্যয়: ৳ " + (totalExpense / 100.0), color = ExpenseRed)
                    Divider(modifier = Modifier.padding(vertical = 8.dp), color = MutedSlate.copy(alpha = 0.3f))

                    Text(
                        text = "সারাদিনের নিট লাভ: ৳ " + (netProfit / 100.0),
                        style = MaterialTheme.typography.titleLarge,
                        color = ProfitSky
                    )
                    Text(text = "স্বত্বাধিকারীর স্বাক্ষর: আব্দুছ ছালাম (Salam)", color = MutedSlate)
                }
            }
        }
    }
}
