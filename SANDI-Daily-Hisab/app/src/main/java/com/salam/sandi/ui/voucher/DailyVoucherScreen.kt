package com.salam.sandi.ui.voucher

import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.salam.sandi.data.entity.VoucherEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*
import com.salam.sandi.utils.PdfGenerator
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun DailyVoucherScreen(repository: SandiRepository) {
    val context = LocalContext.current
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val todayDate = remember { SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date()) }
    val voucherNumber = remember { "SDI-" + todayDate.replace("-", "") }

    val dayIncomes = incomes.filter { it.date == todayDate }
    val dayExpenses = expenses.filter { it.date == todayDate }

    val totalIncomePoisha = dayIncomes.sumOf { it.amountPoisha }
    val totalExpensePoisha = dayExpenses.sumOf { it.amountPoisha }
    val netProfitPoisha = totalIncomePoisha - totalExpensePoisha

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Column {
                Text(
                    text = "সারাদিনের দৈনিক সম্মিলিত ভাউচার",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = GoldAccent
                )
                Text(
                    text = "১টি ভাউচারেই সারাদিনের মোট আয় ও ব্যয় হিসাব (৩০ দিনে ৩০টি ভাউচার)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MutedSlate
                )
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(20.dp),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent.copy(alpha = 0.4f)))
            ) {
                Column(
                    modifier = Modifier.padding(18.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Voucher Header
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column {
                            Text(
                                text = "SANDI AUTO EASY BIKE",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Black,
                                color = GoldAccent,
                                letterSpacing = 1.sp
                            )
                            Text(
                                text = "কোম্পানি: Sandi · মালিক: আব্দুছ ছালাম (০১৬২০২৩০৮৬৪)",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate
                            )
                            Text(
                                text = "গাড়ি: SANDI Passenger Electric Easy Bike (কুমিল্লা-থ-১১-৪৫০২)",
                                style = MaterialTheme.typography.labelSmall,
                                color = MutedSlate.copy(alpha = 0.8f)
                            )
                        }
                    }

                    Surface(
                        color = ObsidianBlack.copy(alpha = 0.7f),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 10.dp, vertical = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = "ভাউচার নং: $voucherNumber", color = GoldAccent, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.Bold)
                            Text(text = "তারিখ: $todayDate", color = TextWhite, style = MaterialTheme.typography.labelMedium)
                        }
                    }

                    Divider(color = MutedSlate.copy(alpha = 0.2f), thickness = 1.dp)

                    // Incomes Section
                    Text(
                        text = "সারাদিনের আয় বিবরণী (${dayIncomes.size} টি এন্ট্রি):",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = IncomeGreen
                    )

                    if (dayIncomes.isEmpty()) {
                        Text(text = "• আজকে এখনো কোনো আয়ের এন্ট্রি নেই", color = MutedSlate, style = MaterialTheme.typography.bodySmall)
                    } else {
                        dayIncomes.forEach { inc ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "• ${inc.tripDescription}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = TextWhite,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    text = "৳ ${inc.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.bodySmall,
                                    fontWeight = FontWeight.Bold,
                                    color = IncomeGreen
                                )
                            }
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "সারাদিনের মোট আয়:", fontWeight = FontWeight.Bold, color = IncomeGreen)
                        Text(text = "৳ ${totalIncomePoisha / 100.0}", fontWeight = FontWeight.Black, color = IncomeGreen)
                    }

                    Divider(color = MutedSlate.copy(alpha = 0.2f), thickness = 1.dp)

                    // Expenses Section
                    Text(
                        text = "সারাদিনের ব্যয় বিবরণী (${dayExpenses.size} টি এন্ট্রি):",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = ExpenseRed
                    )

                    if (dayExpenses.isEmpty()) {
                        Text(text = "• আজকে এখনো কোনো ব্যয়ের এন্ট্রি নেই", color = MutedSlate, style = MaterialTheme.typography.bodySmall)
                    } else {
                        dayExpenses.forEach { exp ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "• ${exp.description}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = TextWhite,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    text = "৳ ${exp.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.bodySmall,
                                    fontWeight = FontWeight.Bold,
                                    color = ExpenseRed
                                )
                            }
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "সারাদিনের মোট ব্যয়:", fontWeight = FontWeight.Bold, color = ExpenseRed)
                        Text(text = "৳ ${totalExpensePoisha / 100.0}", fontWeight = FontWeight.Black, color = ExpenseRed)
                    }

                    Divider(color = GoldAccent.copy(alpha = 0.3f), thickness = 1.dp)

                    // Big Net Profit Highlight
                    Surface(
                        color = ObsidianBlack,
                        shape = RoundedCornerShape(12.dp),
                        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent.copy(alpha = 0.5f)))
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(text = "সারাদিনের নিট লাভ / হাতে জমা", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                                Text(
                                    text = "৳ ${netProfitPoisha / 100.0}",
                                    style = MaterialTheme.typography.headlineMedium,
                                    fontWeight = FontWeight.Black,
                                    color = if (netProfitPoisha >= 0) GoldAccent else ExpenseRed
                                )
                            }

                            Surface(
                                color = GoldAccent.copy(alpha = 0.15f),
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Text(
                                    text = "আজকের ক্যাশ",
                                    color = GoldAccent,
                                    style = MaterialTheme.typography.labelSmall,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    // Proprietor Signature Line
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 8.dp),
                        horizontalAlignment = Alignment.End
                    ) {
                        Text(
                            text = "Salam",
                            style = MaterialTheme.typography.headlineSmall,
                            fontFamily = FontFamily.Cursive,
                            fontWeight = FontWeight.Bold,
                            color = ProfitSky
                        )
                        Divider(modifier = Modifier.width(160.dp), color = MutedSlate.copy(alpha = 0.4f), thickness = 1.dp)
                        Text(
                            text = "স্বত্বাধিকারীর স্বাক্ষর: আব্দুছ ছালাম",
                            style = MaterialTheme.typography.labelSmall,
                            color = MutedSlate
                        )
                    }

                    // Share Button
                    Button(
                        onClick = {
                            val dummyVoucher = VoucherEntity(
                                date = todayDate,
                                voucherNumber = voucherNumber,
                                totalIncomePoisha = totalIncomePoisha,
                                totalExpensePoisha = totalExpensePoisha,
                                netProfitPoisha = netProfitPoisha,
                                generatedTime = "Daily",
                                snapshotJson = "{}"
                            )
                            try {
                                val pdfFile = PdfGenerator.generateDailyVoucherPdf(context, dummyVoucher, false)
                                val shareIntent = Intent(Intent.ACTION_SEND).apply {
                                    type = "text/plain"
                                    putExtra(Intent.EXTRA_SUBJECT, "SANDI ভাউচার: $voucherNumber")
                                    putExtra(Intent.EXTRA_TEXT, "SANDI AUTO EASY BIKE\nভাউচার: $voucherNumber\nতারিখ: $todayDate\nমোট আয়: ৳ ${totalIncomePoisha / 100.0}\nমোট ব্যয়: ৳ ${totalExpensePoisha / 100.0}\nনিট লাভ: ৳ ${netProfitPoisha / 100.0}\nমালিক: আব্দুছ ছালাম")
                                }
                                context.startActivity(Intent.createChooser(shareIntent, "ভাউচার শেয়ার করুন"))
                            } catch (e: Exception) {
                                // Fallback simple text share
                                val sendIntent = Intent().apply {
                                    action = Intent.ACTION_SEND
                                    putExtra(Intent.EXTRA_TEXT, "SANDI AUTO EASY BIKE - ভাউচার: $voucherNumber\nমোট আয়: ৳ ${totalIncomePoisha / 100.0}\nমোট ব্যয়: ৳ ${totalExpensePoisha / 100.0}\nনিট লাভ: ৳ ${netProfitPoisha / 100.0}")
                                    type = "text/plain"
                                }
                                context.startActivity(Intent.createChooser(sendIntent, "ভাউচার শেয়ার করুন"))
                            }
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = GoldAccent),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.Share, contentDescription = null, tint = ObsidianBlack, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = "ভাউচার কপি / শেয়ার করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
